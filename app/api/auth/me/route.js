

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    // JWT payload (contains user id)
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          authenticated: false,
        },
        {
          status: 401,
        }
      );
    }

    // Fetch latest user details from DB
    const result = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, currentUser.id));

    if (result.length === 0) {
      return NextResponse.json(
        {
          authenticated: false,
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: result[0],
    });
  } catch (error) {
    console.error("Auth Me Error:", error);

    return NextResponse.json(
      {
        authenticated: false,
      },
      {
        status: 401,
      }
    );
  }
}