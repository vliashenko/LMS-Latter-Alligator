import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

import * as schema from '../db/schema';

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log('Seeding database');

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.insert(schema.courses).values([
            {
                id: 1,
                title: 'Beginner',
                imageSrc: '/chick.png'
            },
            {
                id: 2,
                title: 'Elementary',
                imageSrc: '/chicken.png'
            },
            {
                id: 3,
                title: 'Pre Intermediate',
                imageSrc: '/dog.png'
            },
            {
                id: 4,
                title: 'Intermediate',
                imageSrc: '/bear.png'
            },
            {
                id: 5,
                title: 'Upper Intermediate',
                imageSrc: '/crocodile.png'
            },
        ])

        console.log('Seeding is finished');
    } catch (error) {
        console.error(error);
        throw new Error('Failed to seed the database');
    }
}

main();