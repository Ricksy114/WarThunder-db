"use client";

import { Nation, TankType, NATIONS, TYPES } from "@/data/tanks";

interface FilterBarProps {
  activeNation: Nation | "ALL";
  activeType: TankType | "ALL";
  onNationChange: (n: Nation | "ALL") => void;
  onTypeChange: (t: TankType | "ALL") => void;
}

export default function FilterBar({
  activeNation,
  activeType,
  onNationChange,
  onTypeChange,
}: FilterBarProps) {
  return (
    <div className="space-y-4">
      {/* Nation filters */}
      <div>
        <p className="font-mono text-[10px] tracking-[4px] text-stone-500 uppercase mb-2.5">
          // Nation
        </p>
        <div className="flex flex-wrap gap-2">
          {NATIONS.map(({ value, label, flag }) => (
            <button
              key={value}
              onClick={() => onNationChange(value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 border font-['Barlow_Condensed'] font-semibold text-xs tracking-widest uppercase transition-all duration-150
                ${
                  activeNation === value
                    ? "bg-lime-500/10 border-lime-500 text-lime-400 shadow-[0_0_10px_rgba(132,204,22,0.1)]"
                    : "bg-stone-900 border-stone-700 text-stone-500 hover:border-lime-500/50 hover:text-stone-300"
                }`}
            >
              {flag && <span className="text-sm">{flag}</span>}
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Type filters */}
      <div>
        <p className="font-mono text-[10px] tracking-[4px] text-stone-500 uppercase mb-2.5">
          // Type
        </p>
        <div className="flex flex-wrap gap-2">
          {TYPES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onTypeChange(value)}
              className={`px-3 py-1.5 border font-['Barlow_Condensed'] font-semibold text-xs tracking-widest uppercase transition-all duration-150
                ${
                  activeType === value
                    ? "bg-lime-500/10 border-lime-500 text-lime-400 shadow-[0_0_10px_rgba(132,204,22,0.1)]"
                    : "bg-stone-900 border-stone-700 text-stone-500 hover:border-lime-500/50 hover:text-stone-300"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
