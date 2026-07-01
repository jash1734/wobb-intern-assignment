import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { formatEngagementRate } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useSelectedProfilesStore } from "@/store/useSelectedProfilesStore";

function formatFollowersDetail(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(2) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return String(count);
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);
  const addProfile = useSelectedProfilesStore(
  (state) => state.addProfile
);

const selectedProfiles = useSelectedProfilesStore(
  (state) => state.selectedProfiles
);

  useEffect(() => {
  if (!username) return;

  setLoaded(false);

  loadProfileByUsername(username).then((data) => {
    setProfileData(data);
    setLoaded(true);
  });
}, [username]);

  if (!username) {
    return (
      <Layout>
        <p className="text-neutral-400">Invalid profile</p>
        <Link to="/" className="text-amber-500 hover:text-amber-400">Back</Link>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-neutral-500 text-center">Loading...</p>
      </Layout>
    );
  }

 if (!profileData) {
  return (
    <Layout title={`@${username}`}>
      <div className="max-w-md mx-auto text-center py-12">
        <h2 className="text-2xl font-semibold mb-3 text-neutral-100">
          Profile details unavailable
        </h2>

        <p className="text-neutral-500 mb-6">
          Detailed analytics for @{username} are not available yet.
        </p>

        <Link
          to="/"
          className="inline-block px-4 py-2 bg-amber-500 text-neutral-950 font-medium rounded-lg hover:bg-amber-400 transition-colors"
        >
          Back to Search
        </Link>
      </div>
    </Layout>
  );
}

  const user: FullUserProfile = profileData.data.user_profile;
  const isSelected = selectedProfiles.some(
  (profile) => profile.user_id === user.user_id
);

  return (
    <Layout title={user.fullname}>
      <div className="max-w-4xl mx-auto">
      <Link to="/" className="text-sm text-amber-500 hover:text-amber-400 mb-6 inline-block">
        ← Back to search
      </Link>

      <div className="flex gap-6 items-start text-left max-w-2xl mx-auto bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <img
          src={user.picture}
          className="w-24 h-24 rounded-full ring-2 ring-amber-500/60 ring-offset-2 ring-offset-neutral-900"
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-neutral-50">
            @{user.username}
            <VerifiedBadge verified={user.is_verified} />
          </h2>
          <p className="text-neutral-400">{user.fullname}</p>
          <p className="text-xs text-neutral-500 mt-1 uppercase tracking-wide">Platform: {platform}</p>

          {user.description && (
            <p className="mt-3 text-sm text-neutral-300">{user.description}</p>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="border border-neutral-800 bg-neutral-950/50 p-3 rounded-lg">
              <div className="text-neutral-500">Followers</div>
              <div className="font-semibold text-neutral-100 font-mono tabular-nums">
                {formatFollowersDetail(user.followers)}
              </div>
            </div>
            <div className="border border-neutral-800 bg-neutral-950/50 p-3 rounded-lg">
              <div className="text-neutral-500">Engagement Rate</div>
              <div className="font-semibold text-neutral-100 font-mono tabular-nums">
                {user.engagement_rate !== undefined
                  ? (user.engagement_rate * 10000).toFixed(2) + "%"
                  : "N/A"}
              </div>
            </div>
            {user.posts_count !== undefined && (
              <div className="border border-neutral-800 bg-neutral-950/50 p-3 rounded-lg">
                <div className="text-neutral-500">Posts</div>
                <div className="font-semibold text-neutral-100 font-mono tabular-nums">{user.posts_count}</div>
              </div>
            )}
            {user.avg_likes !== undefined && (
              <div className="border border-neutral-800 bg-neutral-950/50 p-3 rounded-lg">
                <div className="text-neutral-500">Avg Likes</div>
                <div className="font-semibold text-neutral-100 font-mono tabular-nums">
                  {formatFollowersDetail(user.avg_likes)}
                </div>
              </div>
            )}
            {user.avg_comments !== undefined && (
              <div className="border border-neutral-800 bg-neutral-950/50 p-3 rounded-lg">
                <div className="text-neutral-500">Avg Comments</div>
                <div className="font-semibold text-neutral-100 font-mono tabular-nums">{user.avg_comments}</div>
              </div>
            )}
            {user.avg_views !== undefined && user.avg_views > 0 && (
              <div className="border border-neutral-800 bg-neutral-950/50 p-3 rounded-lg">
                <div className="text-neutral-500">Avg Views</div>
                <div className="font-semibold text-neutral-100 font-mono tabular-nums">
                  {formatFollowersDetail(user.avg_views)}
                </div>
              </div>
            )}
            {user.engagements !== undefined && (
              <div className="border border-neutral-800 bg-neutral-950/50 p-3 rounded-lg">
                <div className="text-neutral-500">Engagements</div>
                <div className="font-semibold text-neutral-100 font-mono tabular-nums">
                  {formatEngagementRate(user.engagement_rate)}
                </div>
              </div>
            )}
          </div>

          {user.url && (
            <a
              href={user.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-block mt-4 text-amber-500 hover:text-amber-400 text-sm"
            >
              View on platform →
            </a>
          )}

          <button
            onClick={() => addProfile(user)}
            disabled={isSelected}
            className={`block mt-4 px-4 py-2 rounded-lg transition-colors ${
              isSelected
                ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                : "bg-amber-500 text-neutral-950 font-medium hover:bg-amber-400"
            }`}
          >
            {isSelected ? "Added" : "Add to List"}
          </button>
        </div>
      </div>
      </div>
    </Layout>
  );
}