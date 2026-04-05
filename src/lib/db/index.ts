import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL;
const isMock = !databaseUrl || databaseUrl.includes('YOUR_DATABASE_URL');

const sql = isMock ? null : neon(databaseUrl!);

// Proxy-based Mock to handle chainable Drizzle calls (select, insert, etc.)
const createMock = () => {
    const handler: ProxyHandler<any> = {
        get: (target, prop) => {
            if (prop === 'then') {
                return (onFulfilled: any) => Promise.resolve([]).then(onFulfilled);
            }
            if (prop === 'catch') {
                return (onRejected: any) => Promise.resolve([]).catch(onRejected);
            }
            return () => new Proxy({}, handler);
        }
    };
    return new Proxy({}, handler) as any;
};

export const db = isMock ? createMock() : drizzle(sql!, { schema });
