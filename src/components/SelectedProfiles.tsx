import { useSelectedProfilesStore } from "@/store/useSelectedProfilesStore";
import { VerifiedBadge } from "./VerifiedBadge";

export function SelectedProfiles() {
  const selectedProfiles = useSelectedProfilesStore(
    (state) => state.selectedProfiles
  );

  const removeProfile = useSelectedProfilesStore(
    (state) => state.removeProfile
  );

  if (selectedProfiles.length === 0) return null;

  return (
    <div className="mb-10 p-6 rounded-xl bg-neutral-900 border border-neutral-800">
      <h2 className="text-sm font-semibold tracking-wide text-neutral-300 uppercase mb-4">
        Selected profiles ({selectedProfiles.length})
      </h2>

      <div className="space-y-2">
        {selectedProfiles.map((profile) => (
          <div
            key={profile.user_id}
            className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/60 border border-neutral-800"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={profile.picture}
                alt={profile.fullname}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/50 ring-offset-2 ring-offset-neutral-800"
              />

              <div className="min-w-0">
                <div className="font-medium text-neutral-100 truncate">
                  @{profile.username || profile.handle}
                  <VerifiedBadge verified={profile.is_verified} />
                </div>

                <div className="text-sm text-neutral-400 truncate">
                  {profile.fullname}
                </div>
              </div>
            </div>

            <button
              onClick={() => removeProfile(profile.user_id)}
              className="shrink-0 px-3 py-1.5 text-sm rounded-lg border border-neutral-700 text-neutral-400 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}