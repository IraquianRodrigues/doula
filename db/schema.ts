import { sql } from "drizzle-orm";
import { check, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable(
  "leads",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    city: text("city").notNull(),
    whatsapp: text("whatsapp").notNull(),
    pregnancyWeeks: integer("pregnancy_weeks").notNull(),
    packageInterest: text("package_interest"),
    consentAt: text("consent_at").notNull(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    check(
      "leads_pregnancy_weeks_range",
      sql`${table.pregnancyWeeks} BETWEEN 1 AND 42`,
    ),
  ],
);
