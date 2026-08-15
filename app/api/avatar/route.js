import { db } from "@/lib/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthorized", { status: 401 });
    }

    const result = await db
      .select({
        avatar: profiles.avatar,
      })
      .from(profiles)
      .where(eq(profiles.userId, currentUser.id));

    let avatar = result[0]?.avatar;

    if (!avatar) {
      return new Response("Not found", { status: 404 });
    }

    let buffer;

    if (Buffer.isBuffer(avatar) || avatar instanceof Uint8Array) {
      buffer = Buffer.from(avatar);
    } else {
      avatar = String(avatar);
      const m = avatar.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
      buffer = Buffer.from(m ? m[2] : avatar, "base64");
    }

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Length": String(buffer.length),
        "Cache-Control": "private, max-age=300",
      },
    });
  } catch (error) {
    console.error("GET Avatar Error:", error);

    return new Response("Failed to load avatar", { status: 500 });
  }
}