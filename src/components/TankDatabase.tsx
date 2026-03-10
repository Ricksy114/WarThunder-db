"use client";

import { useState, useMemo } from "react";
import { tanks, Tank, Nation, TankType } from "@/data/tanks";
import TankCard from "@/components/TankCard";
import TankModal from "@/components/TankModal";
import FilterBar from "@/components/FilterBar";

export default function TankDatabase() {
  const [activeNation, setActiveNation] = useState<Nation | "ALL">("ALL");
  const [activeType, setActiveType] = useState<TankType | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [selectedTank, setSelectedTank] = useState<Tank | null>(null);

  const filtered = useMemo(() => {
    return tanks.filter((t) => {
      const nationOk = activeNation === "ALL" || t.nation === activeNation;
      const typeOk = activeType === "ALL" || t.type === activeType;
      const q = search.toLowerCase();
      const searchOk =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.nation.toLowerCase().includes(q) ||
        t.type.toLowerCase().includes(q);
      return nationOk && typeOk && searchOk;
    });
  }, [activeNation, activeType, search]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-300">
      {/* Scanlines overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
        }}
      />

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-lime-500 flex items-center justify-center text-black font-bold text-lg"
              style={{ clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)" }}>
              🎯
            </div>
            <div>
              <div className="font-['Bebas_Neue'] text-2xl tracking-[4px] text-lime-400 leading-none">
                Armor Archive
              </div>
              <div className="font-mono text-[10px] tracking-widest text-stone-600 leading-none mt-0.5">
                // WAR THUNDER TANK DATABASE
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] tracking-widest text-lime-500">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
            SYSTEM ONLINE
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* ── HERO ── */}
        <section className="text-center mb-12 relative">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(132,204,22,0.05) 0%, transparent 70%)" }}
          />
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-lime-500/40" />
            <span className="font-mono text-[10px] tracking-[4px] text-lime-500 uppercase">
              Classified Database
            </span>
            <div className="h-px w-10 bg-lime-500/40" />
          </div>
          <h1 className="font-['Bebas_Neue'] text-6xl sm:text-8xl tracking-[6px] text-white leading-none mb-2"
            style={{ textShadow: "0 0 40px rgba(132,204,22,0.15)" }}>
            Tank<span className="text-lime-400">&nbsp;Data</span>
            <br />Bank
          </h1>
          <p className="font-mono text-[11px] tracking-widest text-stone-500">
            // ARCHIVES OF ARMORED VEHICLES AND WEAPONRY
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto mt-8">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH DESIGNATION, NATION, OR TYPE..."
              className="w-full bg-stone-900 border border-stone-700 border-l-2 border-l-lime-500 text-stone-300 placeholder-stone-600 font-mono text-xs tracking-widest px-4 py-3 pr-10 focus:outline-none focus:border-lime-500 focus:shadow-[0_0_20px_rgba(132,204,22,0.08)] transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lime-500 text-base pointer-events-none">
              🔍
            </span>
          </div>
        </section>

        {/* ── FILTERS ── */}
        <section className="mb-8">
          <FilterBar
            activeNation={activeNation}
            activeType={activeType}
            onNationChange={setActiveNation}
            onTypeChange={setActiveType}
          />
        </section>

        {/* ── DIVIDER ── */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-stone-800" />
          <span className="font-mono text-[10px] tracking-[3px] text-stone-600 uppercase">
            Operational Units
          </span>
          <div className="flex-1 h-px bg-stone-800" />
        </div>

        {/* Results count */}
        <p className="font-mono text-[10px] tracking-widest text-stone-600 mb-4">
          SHOWING <span className="text-lime-500">{filtered.length}</span> UNITS
        </p>

        {/* ── GRID ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4 opacity-30">🔍</div>
            <p className="font-mono text-xs tracking-widest text-stone-600">
              NO UNITS MATCH CURRENT FILTERS
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((tank, i) => (
              <TankCard
                key={tank.id}
                tank={tank}
                onClick={setSelectedTank}
                index={i}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── MODAL ── */}
      <TankModal tank={selectedTank} onClose={() => setSelectedTank(null)} />
    </div>
  );
}
