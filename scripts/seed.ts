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
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

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
        ]);

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: 'Unit 1',
                description: 'Hello, what’s your name?',
                order: 1,
            }
        ])

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: 'Learning the Alphabet',
            },
        ])

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: 'SELECT',
                order: 1,
                question: 'Назва якої тварини починається на останню літеру англійської абетки?'
            },
        ])

        await db.insert(schema.challengeOptions).values([
            {
               id: 1,
               challengeId: 1,
               imageSrc: '/zebra.png',
               correctOption: true,
               text: 'Zebra',
               audioSrc: '/zebra.mp3',
            },
            {
                id: 2,
                challengeId: 1,
                imageSrc: '/bear.png',
                correctOption: false,
                text: 'Bear',
                audioSrc: '/bear.mp3',
             },
             {
                id: 3,
                challengeId: 1,
                imageSrc: '/dog.png',
                correctOption: false,
                text: 'Dog',
                audioSrc: '/dog.mp3',
             },
             {
                id: 4,
                challengeId: 1,
                imageSrc: '/crocodile.png',
                correctOption: false,
                text: 'Crocodile',
                audioSrc: '/crocodile.mp3',
             },
        ])

        console.log('Seeding is finished');
    } catch (error) {
        console.error(error);
        throw new Error('Failed to seed the database');
    }
}

main();