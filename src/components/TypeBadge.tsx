import { TankType, TYPE_LABELS } from "@/data/tanks";

const typeStyles: Record<TankType, string> = {
  MBT: "border-lime-500/40 text-lime-400 bg-lime-500/10",
  TD: "border-sky-500/40 text-sky-400 bg-sky-500/10",
  SPAA: "border-amber-400/40 text-amber-400 bg-amber-400/10",
  Heavy: "border-orange-500/40 text-orange-400 bg-orange-500/10",
  Light: "border-violet-500/40 text-violet-400 bg-violet-500/10",
};

export default function TypeBadge({ type }: { type: TankType }) {
  return (
    <span
      className={`inline-block border font-mono text-[10px] tracking-widest px-2 py-0.5 uppercase ${typeStyles[type]}`}
    >
      {TYPE_LABELS[type]}
    </span>
  );
}
