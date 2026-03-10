"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Tank, TYPE_LABELS } from "@/data/tanks";
import TypeBadge from "./TypeBadge";
import StatBar from "./StatBar";

interface TankModalProps {
  tank: Tank | null;
  onClose: () => void;
}

export default function TankModal({ tank, onClose }: TankModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!tank) return null;

  const infoRows = [
    { label: "Nation", value: `${tank.flag} ${tank.nation}` },
    { label: "Type", value: TYPE_LABELS[tank.type] },
    { label: "Battle Rating", value: tank.br },
    { label: "Rank", value: `Rank ${tank.rank}` },
    { label: "Weight", value: tank.weight },
    { label: "Crew", value: `${tank.crew} operators` },
    { label: "Era", value: tank.era },
    { label: "Primary Ammo", value: tank.ammo },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative bg-stone-900 border border-lime-500/60 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_0_60px_rgba(132,204,22,0.12)] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-stone-950 border-b border-stone-800">
          <div>
            <h2 className="font-['Bebas_Neue'] text-2xl tracking-widest text-lime-400 leading-none">
              {tank.name}
            </h2>
            <p className="font-mono text-[10px] tracking-widest text-stone-500 uppercase mt-0.5">
              {tank.flag} {tank.nation} · {tank.era}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 border border-stone-700 text-stone-500 hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center font-mono text-sm"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Tank image banner */}
          <div className="relative h-48 bg-stone-950 border border-stone-800 overflow-hidden flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #84cc16 0px, #84cc16 1px, transparent 1px, transparent 20px)",
              }}
            />
            <Image
              src={tank.image}
              alt={tank.name}
              fill
              className="object-contain p-4"
              sizes="640px"
            />
            <span className="absolute bottom-2 right-3 text-2xl z-10">{tank.flag}</span>
          </div>

          {/* Info grid */}
          <div>
            <p className="font-mono text-[10px] tracking-[4px] text-lime-500 uppercase mb-2 pb-1.5 border-b border-stone-800">
              // Specifications
            </p>
            <div className="grid grid-cols-2 gap-2">
              {infoRows.map(({ label, value }) => (
                <div key={label} className="bg-stone-950 border border-stone-800 px-3 py-2">
                  <p className="font-mono text-[10px] tracking-widest text-stone-500 uppercase mb-1">
                    {label}
                  </p>
                  <p className="font-['Barlow_Condensed'] font-bold text-sm text-stone-200 tracking-wide">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance stats */}
          <div>
            <p className="font-mono text-[10px] tracking-[4px] text-lime-500 uppercase mb-3 pb-1.5 border-b border-stone-800">
              // Performance Ratings
            </p>
            <div className="space-y-3">
              <StatBar label="Armor" value={tank.armor} color="green" />
              <StatBar label="Firepower" value={tank.firepower} color="yellow" />
              <StatBar label="Mobility" value={tank.mobility} color="red" />
            </div>
          </div>

          {/* Engine */}
          <div>
            <p className="font-mono text-[10px] tracking-[4px] text-lime-500 uppercase mb-2 pb-1.5 border-b border-stone-800">
              // Powerplant
            </p>
            <div className="bg-stone-950 border border-stone-800 px-3 py-2">
              <p className="font-mono text-[10px] tracking-widest text-stone-500 uppercase mb-1">
                Engine
              </p>
              <p className="font-['Barlow_Condensed'] font-bold text-sm text-stone-200">
                {tank.engine}
              </p>
            </div>
          </div>

          {/* Tactical notes */}
          <div>
            <p className="font-mono text-[10px] tracking-[4px] text-lime-500 uppercase mb-2 pb-1.5 border-b border-stone-800">
              // Tactical Notes
            </p>
            <p className="font-['Barlow_Condensed'] text-base text-stone-400 leading-relaxed border-l-2 border-lime-500/50 pl-4">
              {tank.desc}
            </p>
          </div>

          <div className="pt-1">
            <TypeBadge type={tank.type} />
          </div>
        </div>
      </div>
    </div>
  );
}
