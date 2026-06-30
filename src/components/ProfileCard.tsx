import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";

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

  const handleClick = () => {
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
      {/* TODO: candidates must implement Add to List feature */}
      {/* TODO: candidates must implement Add to List feature */}
      <button
        disabled
        className="
px-4
py-2
rounded-lg
bg-slate-800
text-slate-500
cursor-not-allowed
border
border-slate-700
"
        onClick={(e) => e.stopPropagation()}
      >
        Add to List
      </button>
    </div>
  );
}
