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
    <div className="mb-8 p-6 rounded-2xl bg-slate-900 border border-slate-800">
      <h2 className="text-2xl font-bold text-white mb-4">
        Selected Profiles ({selectedProfiles.length})
      </h2>

      <div className="space-y-3">
        {selectedProfiles.map((profile) => (
          <div
            key={profile.user_id}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-800"
          >
            <div className="flex items-center gap-3">
              <img
                src={profile.picture}
                alt={profile.fullname}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <div className="font-semibold text-white">
                  @{profile.username || profile.handle}
                  <VerifiedBadge verified={profile.is_verified} />
                </div>

                <div className="text-sm text-slate-400">
                  {profile.fullname}
                </div>
              </div>
            </div>

            <button
              onClick={() => removeProfile(profile.user_id)}
              className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}