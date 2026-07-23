import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { goals } from "@/db/schema";
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
      .from(goals)
      .where(eq(goals.userId, user.id))
      .orderBy(desc(goals.createdAt));

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Goal Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load goals",
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
      .insert(goals)
      .values({
        userId: user.id,
        name: body.name,
        target: Number(body.target),
        current: Number(body.current ?? 0),
        deadline: body.deadline ?? null,
        icon: body.icon,
        colorIdx: Number(body.colorIdx),
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("POST Goal Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create goal",
      },
      { status: 500 }
    );
  }
}

// ================= PATCH =================
export async function PATCH(request) {
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
      .update(goals)
      .set({
        current: Number(body.current),
      })
      .where(
        and(
          eq(goals.id, Number(body.id)),
          eq(goals.userId, user.id)
        )
      )
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("PATCH Goal Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update goal",
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
      .delete(goals)
      .where(
        and(
          inArray(goals.id, ids.map(Number)),
          eq(goals.userId, user.id)
        )
      );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE Goal Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete goal",
      },
      { status: 500 }
    );
  }
}