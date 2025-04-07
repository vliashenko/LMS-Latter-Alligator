import { NextResponse } from "next/server";
import db from "@/db/drizzle";

import { eq } from "drizzle-orm";
import { isAdmin } from "@/db/queries";
import { courses } from "@/db/schema";

export const GET = async (req: Request, { params }: { params: { courseId: number } }) => {
    if (!isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { courseId } = await params;

    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId)
    })

    return NextResponse.json(data)
}

export const PUT = async (req: Request, { params }: { params: { courseId: number } }) => {
    if (!isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { courseId } = await params;

    const body = await req.json();

    console.log(body)

    const data = await db.update(courses).set({
        ...body,
    }).where(eq(courses.id, courseId)).returning()

    return NextResponse.json(data[0])
}

export const DELETE = async (req: Request, { params }: { params: { courseId: number } }) => {
    if (!isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { courseId } = await params;

    const data = await db.delete(courses)
    .where(eq(courses.id, courseId)).returning()

    return NextResponse.json(data)
}