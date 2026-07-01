import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok
} from "react-icons/fa";
interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const platformIcons = {
  instagram: <FaInstagram size={16} />,
  youtube: <FaYoutube size={16} />,
  tiktok: <FaTiktok size={16} />,
};

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-4">
      <div className="flex gap-2 justify-center mb-6">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-colors duration-150 border ${
  selected === p
    ? "bg-amber-500 text-neutral-950 border-amber-500"
    : "bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-neutral-200"
}`}
          >
            <label className="flex items-center gap-2 cursor-pointer">
              {platformIcons[p]}
              {getPlatformLabel(p)}
            </label>
          </button>
        ))}
      </div>
      <div className="flex justify-center">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by username or name..."
        className="
w-full
max-w-xl
bg-neutral-900
border
border-neutral-800
px-4
py-3
rounded-lg
text-neutral-100
placeholder:text-neutral-500
focus:outline-none
focus:ring-1
focus:ring-amber-500
focus:border-amber-500
transition-colors
"
      />
      </div>
    </div>
  );
}