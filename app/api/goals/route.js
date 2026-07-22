import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { goals } from "@/db/schema";
import { desc, eq, inArray } from "drizzle-orm";

// ======================
// GET ALL GOALS
// ======================
export async function GET() {
  try {
    const data = await db
      .select()
      .from(goals)
      .orderBy(desc(goals.createdAt));

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Goals Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load goals",
      },
      {
        status: 500,
      }
    );
  }
}

// ======================
// CREATE GOAL
// ======================
export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name || body.target === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    const result = await db
      .insert(goals)
      .values({
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
      {
        status: 500,
      }
    );
  }
}

// ======================
// UPDATE CURRENT SAVINGS
// ======================
export async function PATCH(request) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Goal ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const result = await db
      .update(goals)
      .set({
        current: Number(body.current),
      })
      .where(eq(goals.id, Number(body.id)))
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("PATCH Goal Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update goal",
      },
      {
        status: 500,
      }
    );
  }
}

// ======================
// DELETE GOAL(S)
// ======================
export async function DELETE(request) {
  try {
    const ids = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No goal IDs provided",
        },
        {
          status: 400,
        }
      );
    }

    await db
      .delete(goals)
      .where(inArray(goals.id, ids.map(Number)));

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
      {
        status: 500,
      }
    );
  }
}