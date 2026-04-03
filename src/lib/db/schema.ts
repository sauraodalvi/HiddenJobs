import { pgTable, text, serial, timestamp, integer, boolean, uniqueIndex, doublePrecision } from "drizzle-orm/pg-core";

// Cities table - storing millions of global locations
export const cities = pgTable("cities", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    country: text("country").notNull(),
    countryCode: text("country_code").notNull(), // e.g. "US", "IN"
    population: integer("population"), // Useful for prioritizing static page generation
    latitude: doublePrecision("latitude"),
    longitude: doublePrecision("longitude"),
    jobCount: integer("job_count").default(0),
    createdAt: timestamp("created_at").defaultNow(),
}, (table) => {
    return {
        slugIdx: uniqueIndex("city_slug_idx").on(table.slug),
    };
});

// Job Roles table - standard occupations
export const jobRoles = pgTable("job_roles", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    searchPattern: text("search_pattern"), // The Google Dork string
    category: text("category"), // e.g. "Engineering", "Design"
    createdAt: timestamp("created_at").defaultNow(),
}, (table) => {
    return {
        slugIdx: uniqueIndex("role_slug_idx").on(table.slug),
    };
});

// SEO Content table - caching LLM generated data per City x Job
export const seoContent = pgTable("seo_content", {
    id: serial("id").primaryKey(),
    roleId: integer("role_id").references(() => jobRoles.id),
    cityId: integer("city_id").references(() => cities.id),
    title: text("title"),
    description: text("description"),
    aiOverview: text("ai_overview"), // The long-form Gemini content
    marketInsights: text("market_insights"), // Salary / Job count trends
    faqs: text("faqs"), // JSON stringified FAQs
    updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => {
    return {
        comboIdx: uniqueIndex("role_city_idx").on(table.roleId, table.cityId),
    };
});
