"use client";
import { useUser } from "./UserProvider";

export default function UserProfile() {
  const { profile } = useUser();
  return (
    <div className="flex items-center gap-sm cursor-pointer group">
      {/* <div className="text-right">
        <p className="font-label-md text-on-surface font-bold">{profile.name}</p>
        <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Premium Member</p>
      </div> */}
      <div className="text-right">
        <p className="font-label-md text-on-surface font-bold">{profile.name}</p>
        {/* <p className="font-label-md text-on-surface font-bold">
          {profile.name}
        </p> */}
        <p className="hidden md:block text-[10px] text-on-surface-variant uppercase tracking-wider">
          Premium Member
        </p>
      </div>
      <div className="w-12 h-12 rounded-full border-2 border-surface-variant overflow-hidden">
        {profile.avatar ? (
          <img
            className="w-full h-full object-cover"
            alt="User avatar"
            src={profile.avatar}
          />
        ) : (
          <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
            {profile.name.charAt(0)}
          </div>
        )}
      </div>
    </div>
  );
}
