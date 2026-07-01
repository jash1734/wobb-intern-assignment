import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
  
}

export function ProfileList({
  profiles,
  platform,
  searchQuery,
}: ProfileListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {profiles.length === 0 && (
        <p className="col-span-full text-center text-neutral-500 py-12">No profiles found</p>
      )}
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
          searchQuery={searchQuery}
          
        />
      ))}
    </div>
  );
}