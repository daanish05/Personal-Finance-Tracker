"use client";

import Link from "next/link";
import { useUser } from "./UserProvider";
import { useAuth } from "../contexts/AuthProvider";

export default function UserProfile() {
  const { user } = useAuth();
  const { profile } = useUser();

  const displayName = user?.name || profile.name;
  const displayEmail = user?.email || profile.email;

  const avatar = profile?.avatar || "";

  return (
    <div className="flex items-center gap-sm cursor-pointer group">
      <div className="text-right">
        <p className="hidden md:block font-label-md text-on-surface font-bold">
          {displayName}
        </p>

        <p className="hidden md:block text-[10px] text-on-surface-variant lowercase tracking-wider">
          {displayEmail}
        </p>
      </div>

      <div className="w-12 h-12 rounded-full border-2 border-surface-variant overflow-hidden">
        {avatar ? (
          <Link href="/Settings">
            <img
              className="w-full h-full object-cover"
              alt="User avatar"
              src={avatar}
            />
          </Link>
        ) : (
          <Link href="/Settings">
            <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              {displayName.charAt(0).toUpperCase()}
            </div>
          </Link>
        )}
        {/* {avatar ? (
          <Link href="/Settings">
            <img
              className="w-full h-full object-cover"
              alt="User avatar"
              src={profile.avatar}
            />
          </Link>
        ) : (
          <Link href="/Settings">
            <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              {displayName.charAt(0).toUpperCase()}
            </div>
          </Link>
        )} */}
      </div>
    </div>
  );
}
