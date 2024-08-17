import { NextResponse } from "next/server";
import db from "@/lib/db/drizzle";

import { eq } from "drizzle-orm";

import { units } from "@/lib/db/schema";
import { UserService } from "@/services/users";

export const GET = async (req: Request, { params }: { params: Promise<{ unitId: number }> }) => {
    if (!UserService.isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { unitId } = await params;

    const data = await db.query.units.findFirst({
        where: eq(units.id, unitId)
    })

    return NextResponse.json(data)
}

export const PUT = async (req: Request, { params }: { params: Promise<{ unitId: number }> }) => {
    if (!UserService.isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { unitId } = await params;

    const body = await req.json();

    console.log(body)

    const data = await db.update(units).set({
        ...body,
    }).where(eq(units.id, unitId)).returning()

    return NextResponse.json(data[0])
}

export const DELETE = async (req: Request, { params }: { params: Promise<{ unitId: number }> }) => {
    if (!UserService.isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { unitId } = await params;

    const data = await db.delete(units)
    .where(eq(units.id, unitId)).returning()

    return NextResponse.json(data)
}