"use client";

import Image from "next/image";
import { Tank } from "@/data/tanks";
import TypeBadge from "./TypeBadge";
import StatBar from "./StatBar";

interface TankCardProps {
  tank: Tank;
  onClick: (tank: Tank) => void;
  index: number;
}

export default function TankCard({ tank, onClick, index }: TankCardProps) {
  return (
    <div
      onClick={() => onClick(tank)}
      className="group relative bg-stone-900 border border-stone-700 hover:border-lime-500 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(132,204,22,0.08)] cursor-pointer overflow-hidden"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-0 h-0 border-solid border-t-[28px] border-r-[28px] border-t-transparent border-r-lime-500/60 z-10" />

      {/* Tank image area */}
      <div className="relative h-44 bg-stone-950 border-b border-stone-800 overflow-hidden flex items-center justify-center">
        {/* Diagonal stripe bg texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #84cc16 0px, #84cc16 1px, transparent 1px, transparent 20px)",
          }}
        />
        {/* Tank image */}
        <Image
          src={tank.image}
          alt={tank.name}
          fill
          className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Nation flag bottom-left */}
        <span className="absolute bottom-2 left-2.5 text-xl z-10 drop-shadow-lg">{tank.flag}</span>
        {/* Rank + BR badge bottom-right */}
        <div className="absolute bottom-2 right-2.5 z-10 flex gap-1.5">
          <span className="font-mono text-[10px] text-amber-400 bg-black/70 border border-amber-400/30 px-1.5 py-0.5 tracking-widest">
            RANK {tank.rank}
          </span>
          <span className="font-mono text-[10px] text-stone-400 bg-black/70 border border-stone-600 px-1.5 py-0.5 tracking-widest">
            BR {tank.br}
          </span>
        </div>
        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-['Bebas_Neue'] text-xl tracking-widest text-white leading-none mb-0.5">
          {tank.name}
        </h3>
        <p className="font-mono text-[10px] tracking-widest text-stone-500 mb-3 uppercase">
          {tank.flag} {tank.nation} · {tank.era}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
          <StatBar label="Armor" value={tank.armor} color="green" />
          <StatBar label="Firepower" value={tank.firepower} color="yellow" />
          <StatBar label="Mobility" value={tank.mobility} color="red" />
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[10px] tracking-widest text-stone-500 uppercase">
                Crew
              </span>
              <span className="font-mono text-[10px] text-lime-500">{tank.crew}</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: tank.crew }).map((_, i) => (
                <div key={i} className="h-1.5 flex-1 bg-lime-500/70 border border-lime-500/40" />
              ))}
              {Array.from({ length: Math.max(0, 5 - tank.crew) }).map((_, i) => (
                <div key={i} className="h-1.5 flex-1 bg-stone-800 border border-stone-700" />
              ))}
            </div>
          </div>
        </div>

        <TypeBadge type={tank.type} />
      </div>
    </div>
  );
}
