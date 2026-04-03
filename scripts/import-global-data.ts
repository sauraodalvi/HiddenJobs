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

    // 2. Seed Expanded Tech Hubs
    const additionalCities = [
        { name: "Singapore", slug: "singapore", country: "Singapore", countryCode: "SG", lat: 1.3521, lng: 103.8198, jobs: 1800 },
        { name: "Berlin", slug: "berlin", country: "Germany", countryCode: "DE", lat: 52.5200, lng: 13.4050, jobs: 1200 },
        { name: "Tokyo", slug: "tokyo", country: "Japan", countryCode: "JP", lat: 35.6762, lng: 139.6503, jobs: 950 },
        { name: "Tallinn", slug: "tallinn", country: "Estonia", countryCode: "EE", lat: 59.4370, lng: 24.7536, jobs: 450 },
        { name: "Dubai", slug: "dubai", country: "UAE", countryCode: "AE", lat: 25.2048, lng: 55.2708, jobs: 800 },
        { name: "São Paulo", slug: "sao-paulo", country: "Brazil", countryCode: "BR", lat: -23.5505, lng: -46.6333, jobs: 700 },
        { name: "Bangalore", slug: "bangalore", country: "India", countryCode: "IN", lat: 12.9716, lng: 77.5946, jobs: 3200 },
        { name: "Warsaw", slug: "warsaw", country: "Poland", countryCode: "PL", lat: 52.2297, lng: 21.0122, jobs: 600 },
        { name: "Lisbon", slug: "lisbon", country: "Portugal", countryCode: "PT", lat: 38.7223, lng: -9.1393, jobs: 550 },
        { name: "Amsterdam", slug: "amsterdam", country: "Netherlands", countryCode: "NL", lat: 52.3676, lng: 4.9041, jobs: 1100 },
        { name: "Tel Aviv", slug: "tel-aviv", country: "Israel", countryCode: "IL", lat: 32.0853, lng: 34.7818, jobs: 1400 },
        { name: "Sydney", slug: "sydney", country: "Australia", countryCode: "AU", lat: -33.8688, lng: 151.2093, jobs: 850 },
        { name: "Toronto", slug: "toronto", country: "Canada", countryCode: "CA", lat: 43.6532, lng: -79.3832, jobs: 1500 },
        { name: "Lagos", slug: "lagos", country: "Nigeria", countryCode: "NG", lat: 6.5244, lng: 3.3792, jobs: 300 },
        { name: "Seoul", slug: "seoul", country: "South Korea", countryCode: "KR", lat: 37.5665, lng: 126.9780, jobs: 900 }
    ];

    console.log("Seeding expanded global hubs...");
    for (const city of [...DIRECTORY_LOCATIONS, ...additionalCities as any]) {
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
            set: { jobCount: city.jobCount || city.jobs || 0 }
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
