import { NextResponse } from "next/server";

import db from "@/lib/db/drizzle";
import { UserService } from "@/services/users";
import { challengeOptions } from "@/lib/db/schema";

export const GET = async () => {
    if (!UserService.isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const data = await db.query.challengeOptions.findMany();

    return NextResponse.json(data);
}

export const POST = async (req: Request) => {
    if (!UserService.isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json();

    console.log(body)

    const data = await db.insert(challengeOptions).values({
        ...body,
    }).returning();

    return NextResponse.json(data[0]);
}