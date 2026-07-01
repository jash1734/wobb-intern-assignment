import { useCallback, useState } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import { SelectedProfiles } from "@/components/SelectedProfiles";
import { useMemo } from "react";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");
  
const allProfiles = useMemo(
  () => extractProfiles(platform),
  [platform]
);

const filtered = useMemo(
  () => filterProfiles(allProfiles, searchQuery),
  [allProfiles, searchQuery]
);

const handlePlatformChange = useCallback(
  (p: Platform) => {
    setPlatform(p);
    setSearchQuery("");
  },
  []
);
 
  return (
    <Layout title="Find Influencers">
      <div className="max-w-5xl mx-auto">
      <p className="text-slate-400 text-lg mb-10 text-center">
        Browse top creators across social platforms
      </p>
      <SelectedProfiles />
      <PlatformFilter
        selected={platform}
        onChange={handlePlatformChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <p className="text-xs text-gray-400 mb-2 mt-6">
        Showing {filtered.length} of {allProfiles.length} on {platform}
      </p>
      
      <ProfileList
        profiles={filtered}
        platform={platform}
        searchQuery={searchQuery}
        
      />
      </div>
    </Layout>
  );
}
