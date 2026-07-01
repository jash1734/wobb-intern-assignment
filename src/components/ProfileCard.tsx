import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useSelectedProfilesStore } from "@/store/useSelectedProfilesStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M followers";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K followers";
  return count + " followers";
}

const platformRingColor: Record<Platform, string> = {
  instagram: "ring-rose-500",
  youtube: "ring-red-500",
  tiktok: "ring-teal-400",
};

export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const addProfile = useSelectedProfilesStore(
  (state) => state.addProfile
);

const selectedProfiles = useSelectedProfilesStore(
  (state) => state.selectedProfiles
);

const isSelected = selectedProfiles.some(
  (p) => p.user_id === profile.user_id
);

  const handleClick = () => {
    if (!profile.username) return;

    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  return (
    <div
      onClick={handleClick}
      className="
flex
items-center
gap-4
p-5
w-full
rounded-xl
border
border-neutral-800
bg-neutral-900
hover:border-neutral-700
hover:bg-neutral-800/60
transition-colors
duration-150
cursor-pointer
"
      data-search={searchQuery}
    >
      <img
        src={profile.picture}
        className={`w-14 h-14 rounded-full object-cover ring-2 ring-offset-2 ring-offset-neutral-900 ${platformRingColor[platform]}`}
      />
      <div className="text-left flex-1 min-w-0">
        <div className="font-semibold text-neutral-50 truncate">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-neutral-400 truncate">{profile.fullname}</div>
        <div className="text-sm text-neutral-300 mt-1 font-mono tabular-nums">{formatFollowersLocal(profile.followers)}</div>
      </div>
      
      <button
        onClick={(e) => {
        e.stopPropagation();

        addProfile(profile);
    }}
    disabled={isSelected}
       className={`shrink-0 px-4 py-2 text-sm rounded-lg border transition-colors ${
  isSelected
    ? "bg-neutral-800 text-neutral-500 cursor-not-allowed border-neutral-800"
    : "bg-amber-500 text-neutral-950 hover:bg-amber-400 border-amber-500 font-medium"
}`}
      >
        {isSelected ? "Added" : "Add to List"}
      </button>
    </div>
  );
}