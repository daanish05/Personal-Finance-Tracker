import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, profiles, transactions, accounts, goals } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function DELETE() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
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

    const userId = currentUser.id;

    await db.delete(transactions).where(eq(transactions.userId, userId));
    await db.delete(accounts).where(eq(accounts.userId, userId));
    await db.delete(goals).where(eq(goals.userId, userId));
    await db.delete(profiles).where(eq(profiles.userId, userId));
    await db.delete(users).where(eq(users.id, userId));

    const response = NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });

    response.cookies.delete("token");

    return response;

  } catch (error) {
    console.error("Delete Account Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete account",
      },
      {
        status: 500,
      }
    );
  }
}