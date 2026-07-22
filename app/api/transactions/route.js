import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { transactions } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { date } from "drizzle-orm/mysql-core";

// GET ALL TRANSACTIONS

export async function GET() {
  try {
    const data = await db
      .select()
      .from(transactions)
      .orderBy(desc(transactions.date));

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Faied to Load transactions" },
      { status: 500 },
    );
  }
}

// CREATE TRANSACTION
export async function POST(request) {
  try {
    const body = await request.json();

    // Basic Validation
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
        },
      );
    }

    const result = await db
      .insert(transactions)
      .values({
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
      },
    );
  }
}

// export async function POST(request) {
//   const body = await request.json();

//   const result = await db.insert(transactions).values(body).returning();

//   return NextResponse.json(result[0]);
// }



// DELETE TRANSACTIONS

export async function DELETE(request) {
  try {
    const ids = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No transaction ids provided",
        },
        {
          status: 400,
        },
      );
    }

    await db.delete(transactions).where(inArray(transactions.id, ids));

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
      },
    );
  }
}
