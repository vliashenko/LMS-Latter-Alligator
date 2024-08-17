import { NextResponse } from "next/server";

import db from "@/lib/db/drizzle";

import { lessons } from "@/lib/db/schema";
import { UserService } from "@/services/users";

export const GET = async () => {
    if (!UserService.isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const data = await db.query.lessons.findMany();

    return NextResponse.json(data);
}

export const POST = async (req: Request) => {
    if (!UserService.isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json();

    const data = await db.insert(lessons).values({
        ...body,
    }).returning();

    return NextResponse.json(data[0]);
}