import { env } from "cloudflare:workers";
import { getDb } from "../../../db";
import { leads } from "../../../db/schema";

const CREATE_LEADS_TABLE = `
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    pregnancy_weeks INTEGER NOT NULL CHECK (pregnancy_weeks BETWEEN 1 AND 42),
    package_interest TEXT,
    consent_at TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

let tableReady: Promise<void> | undefined;

function response(body: Record<string, unknown>, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function ensureLeadsTable() {
  if (!env.DB) return Promise.reject(new Error("Database unavailable"));

  tableReady ??= env.DB
    .prepare(CREATE_LEADS_TABLE)
    .run()
    .then(() => undefined)
    .catch((error: unknown) => {
      tableReady = undefined;
      throw error;
    });

  return tableReady;
}

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.normalize("NFKC").trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function normalizeWhatsApp(value: unknown) {
  if (typeof value !== "string") return null;
  const digits = value.replace(/\D/g, "");
  const national = digits.length >= 12 && digits.startsWith("55") ? digits.slice(2) : digits;
  if (!/^[1-9]{2}\d{8,9}$/.test(national)) return null;
  return `+55${national}`;
}

function normalizeWeeks(value: unknown) {
  const raw = typeof value === "number" ? String(value) : value;
  if (typeof raw !== "string" || !/^\d{1,2}$/.test(raw.trim())) return null;
  const weeks = Number(raw);
  return Number.isInteger(weeks) && weeks >= 1 && weeks <= 42 ? weeks : null;
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return response({ ok: false, message: "Envie os dados no formato correto." }, 415);
  }

  try {
    const rawBody = await request.text();
    if (rawBody.length > 8192) {
      return response({ ok: false, message: "Os dados enviados são muito grandes." }, 413);
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return response({ ok: false, message: "Não foi possível ler os dados enviados." }, 400);
    }

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return response({ ok: false, message: "Confira os dados informados." }, 422);
    }

    const values = payload as Record<string, unknown>;
    if (normalizeText(values.website, 200)) {
      return response({ ok: true }, 201);
    }

    const name = normalizeText(values.name, 100);
    const city = normalizeText(values.city, 100);
    const whatsapp = normalizeWhatsApp(values.whatsapp);
    const pregnancyWeeks = normalizeWeeks(values.pregnancyWeeks);
    const packageInterest = normalizeText(values.packageInterest, 80) || null;

    if (
      name.length < 2 ||
      city.length < 2 ||
      !whatsapp ||
      pregnancyWeeks === null ||
      values.consent !== true
    ) {
      return response({ ok: false, message: "Confira os campos obrigatórios." }, 422);
    }

    await ensureLeadsTable();
    const db = getDb();
    await db.insert(leads).values({
      name,
      city,
      whatsapp,
      pregnancyWeeks,
      packageInterest,
      consentAt: new Date().toISOString(),
    });

    return response({ ok: true }, 201);
  } catch {
    return response(
      { ok: false, message: "O envio está temporariamente indisponível. Tente novamente." },
      503,
    );
  }
}
