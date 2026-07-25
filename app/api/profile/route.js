import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/getCurrentUser";

// ================= GET PROFILE =================

export async function GET() {
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

    const result = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        createdAt: users.createdAt,

        phone: profiles.phone,
        location: profiles.location,
        bio: profiles.bio,
        linkedin: profiles.linkedin,
        website: profiles.website,
        avatar: profiles.avatar,

        language: profiles.language,
        timezone: profiles.timezone,

        budgetAlertsEmail: profiles.budgetAlertsEmail,
        budgetAlertsPush: profiles.budgetAlertsPush,

        billRemindersEmail: profiles.billRemindersEmail,
        billRemindersPush: profiles.billRemindersPush,

        monthlyReportsEmail: profiles.monthlyReportsEmail,
        monthlyReportsPush: profiles.monthlyReportsPush,
      })
      .from(users)
      .leftJoin(
        profiles,
        eq(users.id, profiles.userId)
      )
      .where(eq(users.id, currentUser.id));

    return NextResponse.json(result[0]);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load profile",
      },
      {
        status: 500,
      }
    );
  }
}

// ================= UPDATE PROFILE =================

export async function PUT(request) {
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

    const body = await request.json();

    await db
      .update(profiles)
      .set({
        phone: body.phone,
        location: body.location,
        bio: body.bio,
        linkedin: body.linkedin,
        website: body.website,
        avatar: body.avatar,

        language: body.language,
        timezone: body.timezone,

        budgetAlertsEmail: body.budgetAlertsEmail,
        budgetAlertsPush: body.budgetAlertsPush,

        billRemindersEmail: body.billRemindersEmail,
        billRemindersPush: body.billRemindersPush,

        monthlyReportsEmail: body.monthlyReportsEmail,
        monthlyReportsPush: body.monthlyReportsPush,

        updatedAt: new Date().toISOString(),
      })
      .where(eq(profiles.userId, currentUser.id));

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update profile",
      },
      {
        status: 500,
      }
    );
  }
}