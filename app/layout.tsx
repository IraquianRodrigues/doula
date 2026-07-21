import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", baseUrl).toString();

  return {
    metadataBase: baseUrl,
    title: "Cynthia Nicole | Enfermeira e Doula",
    description:
      "Acompanhamento de doula na gestação, parto e puerpério com preparo, presença e acolhimento para você e sua família.",
    keywords: [
      "doula",
      "acompanhamento de doula",
      "preparação para o parto",
      "plano de parto",
      "puerpério",
      "Cynthia Nicole",
    ],
    openGraph: {
      type: "website",
      locale: "pt_BR",
      title: "Cynthia Nicole | Enfermeira e Doula",
      description:
        "Presença que acolhe. Informação que fortalece. Acompanhamento na gestação, parto e puerpério.",
      siteName: "Cynthia Nicole — Doulagem",
      images: [{ url: socialImage, width: 1672, height: 941, alt: "Cynthia Nicole — Enfermeira especialista em Doulagem" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Cynthia Nicole | Enfermeira e Doula",
      description: "Acompanhamento com preparo, presença e acolhimento.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
