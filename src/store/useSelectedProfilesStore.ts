import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary } from "@/types";

interface SelectedProfilesState {
  selectedProfiles: UserProfileSummary[];

  addProfile: (profile: UserProfileSummary) => void;

  removeProfile: (userId: string) => void;

  isSelected: (userId: string) => boolean;
}

export const useSelectedProfilesStore =
  create<SelectedProfilesState>()(
    persist(
      (set, get) => ({
        selectedProfiles: [],

        addProfile: (profile) => {
          const exists = get().selectedProfiles.some(
            (p) => p.user_id === profile.user_id
          );

          if (exists) return;

          set((state) => ({
            selectedProfiles: [
              ...state.selectedProfiles,
              profile,
            ],
          }));
        },

        removeProfile: (userId) =>
          set((state) => ({
            selectedProfiles: state.selectedProfiles.filter(
              (p) => p.user_id !== userId
            ),
          })),

        isSelected: (userId) =>
          get().selectedProfiles.some(
            (p) => p.user_id === userId
          ),
      }),
      {
        name: "selected-influencers",
      }
    )
  );