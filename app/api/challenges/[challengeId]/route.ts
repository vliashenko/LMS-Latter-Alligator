import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/lib/db/drizzle";

import { UserService } from "@/services/users";

import { challenges } from "@/lib/db/schema";

export const GET = async (req: Request, { params }: { params: Promise<{ challengeId: number }> }) => {
    if (!UserService.isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { challengeId } = await params;

    const data = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    })

    return NextResponse.json(data)
}

export const PUT = async (req: Request, { params }: { params: Promise<{ challengeId: number }> }) => {
    if (!UserService.isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { challengeId } = await params;

    const body = await req.json();

    console.log(body)

    const data = await db.update(challenges).set({
        ...body,
    }).where(eq(challenges.id, challengeId)).returning()

    return NextResponse.json(data[0])
}

export const DELETE = async (req: Request, { params }: { params: Promise<{ challengeId: number }> }) => {
    if (!UserService.isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { challengeId } = await params;

    const data = await db.delete(challenges)
    .where(eq(challenges.id, challengeId)).returning()

    return NextResponse.json(data)
}