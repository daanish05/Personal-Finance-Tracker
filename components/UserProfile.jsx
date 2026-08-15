

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthProvider";

export default function UserProfile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    hasAvatar: false,
    avatar: "",
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile");

        if (!res.ok) return;

        const data = await res.json();

        setProfile({
          name: data.name || "",
          email: data.email || "",
          hasAvatar: !!data.hasAvatar,
          avatar: data.hasAvatar ? `/api/avatar?v=${Date.now()}` : "",
        });
      } catch (err) {
        console.error(err);
      }
    }

    loadProfile();

    const handleProfileUpdated = () => loadProfile();
    window.addEventListener("profile-updated", handleProfileUpdated);

    return () =>
      window.removeEventListener("profile-updated", handleProfileUpdated);
  }, []);

  const displayName = profile.name || user?.name || "";
  const displayEmail = profile.email || user?.email || "";

  return (
    <Link
      href="/Settings"
      className="flex items-center gap-sm cursor-pointer group"
    >
      <div className="text-right">
        <p className="hidden md:block font-label-md text-on-surface font-bold">
          {displayName}
        </p>

        <p className="hidden md:block text-[10px] text-on-surface-variant lowercase tracking-wider">
          {displayEmail}
        </p>
      </div>

      <div className="w-12 h-12 rounded-full border-2 border-surface-variant overflow-hidden">
        {profile.hasAvatar ? (
          <img
            src={profile.avatar}
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </Link>
  );
}