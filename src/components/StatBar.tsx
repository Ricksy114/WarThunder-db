"use client";

interface StatBarProps {
  label: string;
  value: number;
  color?: "green" | "yellow" | "red" | "blue";
}

const colorMap = {
  green: "bg-lime-500",
  yellow: "bg-amber-400",
  red: "bg-red-500",
  blue: "bg-sky-400",
};

export default function StatBar({ label, value, color = "green" }: StatBarProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[10px] tracking-widest text-stone-500 uppercase">
          {label}
        </span>
        <span className="font-mono text-[10px] text-lime-500">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-stone-800 border border-stone-700 overflow-hidden">
        <div
          className={`h-full ${colorMap[color]} transition-all duration-700`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
