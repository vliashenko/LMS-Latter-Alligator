import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db/drizzle";

export const getTopTenUsers = cache(async () => {
    const { userId } = await auth();

    if (!userId) {
        return [];
    }

    const data = await db.query.userProgress.findMany({
        orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
        limit: 10,
        columns: {
            userId: true,
            userName: true,
            userImageSrc: true,
            points: true,
        }
    })

    return data;
})
