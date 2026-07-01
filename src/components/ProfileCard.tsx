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
mb-4
w-full
rounded-2xl
border
border-slate-800
bg-slate-900
hover:-translate-y-1
hover:border-indigo-500/50
hover:shadow-2xl
transition-all
duration-300
cursor-pointer
"
      data-search={searchQuery}
    >
      <img src={profile.picture} className="w-16 h-16 rounded-full object-cover" />
      <div className="text-left flex-1">
        <div className="font-semibold text-lg text-white">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-slate-400">{profile.fullname}</div>
        <div className="text-sm text-slate-300 mt-1">{formatFollowersLocal(profile.followers)}</div>
      </div>
      
      <button
        onClick={(e) => {
        e.stopPropagation();

        addProfile(profile);
    }}
    disabled={isSelected}
       className={`px-4 py-2 rounded-lg border transition ${
  isSelected
    ? "bg-slate-800 text-slate-500 cursor-not-allowed border-slate-700"
    : "bg-indigo-600 text-white hover:bg-indigo-700 border-indigo-600"
}`}
      >
        {isSelected ? "Added" : "Add to List"}
      </button>
    </div>
  );
}
