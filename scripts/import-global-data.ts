import { db } from "../src/lib/db";
import { cities, jobRoles } from "../src/lib/db/schema";
import { DIRECTORY_ROLES, DIRECTORY_LOCATIONS } from "../src/lib/constants";

async function main() {
    console.log("Starting Global Data Ingestion...");

    // 1. Seed Roles from Constants
    console.log("Seeding standard roles...");
    for (const role of DIRECTORY_ROLES) {
        await db.insert(jobRoles).values({
            name: role.label,
            slug: role.slug,
            category: "Engineering", // Default
        }).onConflictDoNothing();
    }

    // 2. Seed Expanded Tech Hubs from JSON
    console.log("Seeding expanded global hubs from high-fidelity dataset...");
    let expandedCities = [];
    try {
        const data = require("./top-tech-cities.json");
        expandedCities = data;
    } catch (e) {
        console.warn("top-tech-cities.json not found, using minimal fallback...");
    }

    const allCitiesToIngest = [...DIRECTORY_LOCATIONS, ...expandedCities];

    // Deduplicate by slug
    const uniqueCities = Array.from(new Map(allCitiesToIngest.map(c => [c.slug, c])).values());

    for (const city of uniqueCities as any) {
        await db.insert(cities).values({
            name: city.label || city.name,
            slug: city.slug,
            country: city.country || "Global",
            countryCode: city.countryCode || "UN",
            population: city.jobCount ? city.jobCount * 1000 : 100000,
            latitude: city.coords?.lat || city.lat,
            longitude: city.coords?.lng || city.lng,
            jobCount: city.jobCount || city.jobs || 0
        }).onConflictDoUpdate({
            target: [cities.slug],
            set: {
                jobCount: city.jobCount || city.jobs || 0,
                latitude: city.coords?.lat || city.lat,
                longitude: city.coords?.lng || city.lng
            }
        });
    }

    // 3. (Optional) Ingest 1000+ Global Cities from Sample Data
    // In a production scenario, you would fetch from a GeoNames CSV here.
    // For now, we've enabled the pipe for any city added to the DB.

    console.log("Ingestion Complete!");
    process.exit(0);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
