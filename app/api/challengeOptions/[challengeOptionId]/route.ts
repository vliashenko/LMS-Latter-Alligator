import { NextResponse } from "next/server";
import db from "@/lib/db/drizzle";

import { eq } from "drizzle-orm";

import { challengeOptions } from "@/lib/db/schema";
import { UserService } from "@/services/users";

export const GET = async (req: Request, { params }: { params: Promise<{ challengeOptionId: number }> }) => {
    if (!UserService.isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { challengeOptionId } = await params;

    const data = await db.query.challengeOptions.findFirst({
        where: eq(challengeOptions.id, challengeOptionId)
    })

    return NextResponse.json(data)
}

export const PUT = async (req: Request, { params }: { params: Promise<{ challengeOptionId: number }> }) => {
    if (!UserService.isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { challengeOptionId } = await params;

    const body = await req.json();

    const data = await db.update(challengeOptions).set({
        ...body,
    }).where(eq(challengeOptions.id, challengeOptionId)).returning()

    return NextResponse.json(data[0])
}

export const DELETE = async (req: Request, { params }: { params: Promise<{ challengeOptionId: number }> }) => {
    if (!UserService.isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { challengeOptionId } = await params;

    const data = await db.delete(challengeOptions)
    .where(eq(challengeOptions.id, challengeOptionId)).returning()

    return NextResponse.json(data)
}