"use server";

import { db } from "@/lib/db";
import { cities, jobRoles } from "@/lib/db/schema";
import { sql, ilike, desc, or } from "drizzle-orm";

export async function searchCities(query: string) {
    if (!query || query.length < 2) return [];

    // Fallback for mock mode
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('YOUR_DATABASE_URL')) {
        const { DIRECTORY_LOCATIONS } = await import("@/lib/constants");
        return DIRECTORY_LOCATIONS
            .filter(l => l.label.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5)
            .map(l => ({ name: l.label, slug: l.slug }));
    }

    const results = await db.select({
        name: cities.name,
        slug: cities.slug,
        country: cities.country
    })
        .from(cities)
        .where(
            or(
                ilike(cities.name, `%${query}%`),
                ilike(cities.slug, `%${query}%`)
            )
        )
        .orderBy(desc(cities.population))
        .limit(10);

    return results;
}

export async function getMapMarkers() {
    // Fallback for mock mode
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('YOUR_DATABASE_URL')) {
        const { DIRECTORY_LOCATIONS } = await import("@/lib/constants");
        return DIRECTORY_LOCATIONS
            .filter(l => l.coords)
            .map(l => ({ ...l, name: l.label, lat: l.coords?.lat, lng: l.coords?.lng }));
    }

    return await db.select({
        name: cities.name,
        slug: cities.slug,
        lat: cities.latitude,
        lng: cities.longitude,
        population: cities.population,
        jobCount: cities.jobCount
    })
        .from(cities)
        .where(sql`${cities.latitude} IS NOT NULL`)
        .orderBy(desc(cities.jobCount), desc(cities.population)) // Prioritize job density
        .limit(500); // Limit to top 500 cities for performance on map
}

export async function getDirectoryData() {
    // Fallback for mock mode
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('YOUR_DATABASE_URL')) {
        const { DIRECTORY_ROLES, DIRECTORY_LOCATIONS, DIRECTORY_PLATFORMS } = await import("@/lib/constants");
        return {
            roles: DIRECTORY_ROLES.slice(0, 20),
            cities: DIRECTORY_LOCATIONS.slice(0, 20),
            platforms: DIRECTORY_PLATFORMS
        };
    }

    const [topRoles, topCities] = await Promise.all([
        db.select().from(jobRoles).orderBy(desc(jobRoles.id)).limit(30),
        db.select().from(cities).orderBy(desc(cities.jobCount), desc(cities.population)).limit(30)
    ]);

    const { DIRECTORY_PLATFORMS } = await import("@/lib/constants");

    return {
        roles: topRoles.map((r: any) => ({ label: r.name, slug: r.slug })),
        cities: topCities.map((c: any) => ({ label: c.name, slug: c.slug, jobCount: c.jobCount })),
        platforms: DIRECTORY_PLATFORMS
    };
}
