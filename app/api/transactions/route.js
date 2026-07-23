import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { transactions } from "@/db/schema";
import { desc, eq, and, inArray } from "drizzle-orm";
import { getCurrentUser } from "@/lib/getCurrentUser";

// =====================
// GET ALL TRANSACTIONS
// =====================
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const data = await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, user.id))
      .orderBy(desc(transactions.date));

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Transaction Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load transactions",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================
// CREATE TRANSACTION
// =====================
export async function POST(request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    if (
      !body.title ||
      body.amount === undefined ||
      !body.type ||
      !body.category ||
      !body.account ||
      !body.date
    ) {
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
      .insert(transactions)
      .values({
        userId: user.id,
        title: body.title,
        amount: Number(body.amount),
        type: body.type,
        category: body.category,
        account: body.account,
        date: body.date,
        note: body.note ?? "",
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("POST Transaction Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create transaction",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================
// DELETE TRANSACTIONS
// =====================
export async function DELETE(request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const ids = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No transaction IDs provided",
        },
        {
          status: 400,
        }
      );
    }

    await db
      .delete(transactions)
      .where(
        and(
          inArray(transactions.id, ids.map(Number)),
          eq(transactions.userId, user.id)
        )
      );

    return NextResponse.json({
      success: true,
      message: "Transactions deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Transaction Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete transactions",
      },
      {
        status: 500,
      }
    );
  }
}