import { db } from '../src/lib/db';
import { cities, jobRoles } from '../src/lib/db/schema';
import { DIRECTORY_LOCATIONS, DIRECTORY_ROLES } from '../src/lib/constants';

async function seed() {
    console.log('🌱 Cloud seeding existing data...');

    // Seed Cities
    for (const location of DIRECTORY_LOCATIONS) {
        await db.insert(cities).values({
            name: location.label,
            slug: location.slug,
            country: 'Global', // Fallback for initial seed
            countryCode: 'XX',
            latitude: location.coords?.lat,
            longitude: location.coords?.lng,
            population: location.jobCount ? location.jobCount * 100 : 50000,
        }).onConflictDoNothing();
    }

    // Seed Roles
    for (const role of DIRECTORY_ROLES) {
        await db.insert(jobRoles).values({
            name: role.label,
            slug: role.slug,
            category: 'Tech',
        }).onConflictDoNothing();
    }

    console.log('✅ Seeding complete.');
}

seed().catch(console.error);
