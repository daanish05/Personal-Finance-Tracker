import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { transactions } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  const data = await db
    .select()
    .from(transactions)
    .orderBy(desc(transactions.date));

  return NextResponse.json(data);
}

export async function POST(request) {
  const body = await request.json();

  const result = await db
    .insert(transactions)
    .values(body)
    .returning();

  return NextResponse.json(result[0]);
}