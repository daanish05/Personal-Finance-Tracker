import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { accounts } from "@/db/schema";
import { desc, eq, inArray } from "drizzle-orm";

// ================= GET =================
export async function GET() {
  try {
    const data = await db
      .select()
      .from(accounts)
      .orderBy(desc(accounts.createdAt));

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load accounts",
      },
      { status: 500 }
    );
  }
}

// ================= POST =================
export async function POST(request) {
  try {
    const body = await request.json();

    const result = await db
      .insert(accounts)
      .values({
        name: body.name,
        desc: body.desc,
        balance: Number(body.balance),
        color: body.color,
        icon: body.icon,
        badge: body.badge ?? null,
        trend: body.trend,
        wide: body.wide ?? false,
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create account",
      },
      { status: 500 }
    );
  }
}

// ================= PUT =================
export async function PUT(request) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Account ID is required",
        },
        { status: 400 }
      );
    }

    const result = await db
      .update(accounts)
      .set({
        name: body.name,
        desc: body.desc,
        balance: Number(body.balance),
        color: body.color,
        icon: body.icon,
        badge: body.badge ?? null,
        trend: body.trend,
        wide: body.wide ?? false,
      })
      .where(eq(accounts.id, Number(body.id)))
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update account",
      },
      { status: 500 }
    );
  }
}

// ================= DELETE =================
export async function DELETE(request) {
  try {
    const ids = await request.json();

    await db
      .delete(accounts)
      .where(inArray(accounts.id, ids.map(Number)));

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete account",
      },
      { status: 500 }
    );
  }
}