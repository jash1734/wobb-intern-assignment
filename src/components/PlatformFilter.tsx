import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-4">
      <div className="flex gap-2 justify-center mb-3">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`px-5 py-2.5 rounded-full font-medium cursor-pointer transition-all duration-200 ${
  selected === p
    ? "bg-indigo-600 text-white shadow-lg"
    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
}`}
          >
            {getPlatformLabel(p)}
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by username or name..."
        className="
w-full
max-w-xl
bg-slate-900
border
border-slate-700
px-4
py-3
rounded-xl
text-slate-100
placeholder:text-slate-500
focus:outline-none
focus:ring-2
focus:ring-indigo-500
"
      />
      </div>
    </div>
  );
}
