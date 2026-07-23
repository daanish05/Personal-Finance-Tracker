import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { accounts } from "@/db/schema";
import { desc, eq, and, inArray } from "drizzle-orm";
import { getCurrentUser } from "@/lib/getCurrentUser";

// ================= GET =================
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await db
      .select()
      .from(accounts)
      .where(eq(accounts.userId, user.id))
      .orderBy(desc(accounts.createdAt));

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Accounts Error:", error);

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
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const result = await db
      .insert(accounts)
      .values({
        userId: user.id,
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
    console.error("POST Account Error:", error);

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
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

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
      .where(
        and(
          eq(accounts.id, Number(body.id)),
          eq(accounts.userId, user.id)
        )
      )
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("PUT Account Error:", error);

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
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const ids = await request.json();

    await db
      .delete(accounts)
      .where(
        and(
          inArray(accounts.id, ids.map(Number)),
          eq(accounts.userId, user.id)
        )
      );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE Account Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete accounts",
      },
      { status: 500 }
    );
  }
}