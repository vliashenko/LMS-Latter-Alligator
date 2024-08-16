import { NextResponse } from "next/server";
import db from "@/db/drizzle";

import { eq } from "drizzle-orm";
import { isAdmin } from "@/db/queries";
import { lessons } from "@/db/schema";

export const GET = async (req: Request, { params }: { params: { lessonId: number } }) => {
    if (!isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { lessonId } = await params;

    const data = await db.query.units.findFirst({
        where: eq(lessons.id, lessonId)
    })

    return NextResponse.json(data)
}

export const PUT = async (req: Request, { params }: { params: { lessonId: number } }) => {
    if (!isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { lessonId } = await params;

    const body = await req.json();

    console.log(body)

    const data = await db.update(lessons).set({
        ...body,
    }).where(eq(lessons.id, lessonId)).returning()

    return NextResponse.json(data[0])
}

export const DELETE = async (req: Request, { params }: { params: { lessonId: number } }) => {
    if (!isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { lessonId } = await params;

    const data = await db.delete(lessons)
    .where(eq(lessons.id, lessonId)).returning()

    return NextResponse.json(data)
}