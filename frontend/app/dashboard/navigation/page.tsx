"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation, MapPin, Search, Accessibility, Route, Clock, Zap } from "lucide-react";

const STORE_AISLES = [
  { id: "a1", name: "Produce", x: 10, y: 15, w: 18, h: 20, color: "#10b981" },
  { id: "a2", name: "Dairy", x: 32, y: 15, w: 18, h: 20, color: "#3b82f6" },
  { id: "a3", name: "Bakery", x: 54, y: 15, w: 18, h: 20, color: "#f59e0b" },
  { id: "a4", name: "Beverages", x: 76, y: 15, w: 18, h: 20, color: "#06b6d4" },
  { id: "a5", name: "Snacks", x: 10, y: 42, w: 18, h: 20, color: "#ec4899" },
  { id: "a6", name: "Frozen", x: 32, y: 42, w: 18, h: 20, color: "#8b5cf6" },
  { id: "a7", name: "Personal Care", x: 54, y: 42, w: 18, h: 20, color: "#ef4444" },
  { id: "a8", name: "Cleaning", x: 76, y: 42, w: 18, h: 20, color: "#14b8a6" },
  { id: "a9", name: "Electronics", x: 10, y: 70, w: 28, h: 18, color: "#a855f7" },
  { id: "a10", name: "Checkout", x: 42, y: 70, w: 52, h: 18, color: "#f97316" },
];

const PRODUCTS_DB = [
  { name: "Organic Milk", aisle: "Dairy", location: "A2, Shelf 3" },
  { name: "Sourdough Bread", aisle: "Bakery", location: "A3, Shelf 1" },
  { name: "Avocados", aisle: "Produce", location: "A1, Shelf 5" },
  { name: "Orange Juice", aisle: "Beverages", location: "A4, Shelf 2" },
  { name: "Potato Chips", aisle: "Snacks", location: "A5, Shelf 4" },
  { name: "Ice Cream", aisle: "Frozen", location: "A6, Shelf 1" },
  { name: "Shampoo", aisle: "Personal Care", location: "A7, Shelf 2" },
  { name: "Dish Soap", aisle: "Cleaning", location: "A8, Shelf 3" },
];

export default function NavigationPage() {
  const [search, setSearch] = useState("");
  const [selectedAisle, setSelectedAisle] = useState<string | null>(null);
  const [showRoute, setShowRoute] = useState(false);

  const filteredProducts = search.length > 1
    ? PRODUCTS_DB.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  const handleProductSelect = (aisle: string) => {
    const a = STORE_AISLES.find((a) => a.name === aisle);
    if (a) {
      setSelectedAisle(a.id);
      setShowRoute(true);
      setSearch("");
    }
  };

  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-white flex items-center gap-2">
          <Navigation className="w-6 h-6 text-blue-400" />
          Smart Indoor Navigation
        </h1>
        <p className="text-sm text-slate-500 mt-1">AI product locator • Congestion-aware routing</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: MapPin, label: "Store Zones", value: "10", color: "text-cyan-400 bg-cyan-500/10" },
          { icon: Route, label: "Active Routes", value: "24", color: "text-emerald-400 bg-emerald-500/10" },
          { icon: Accessibility, label: "Accessible Paths", value: "100%", color: "text-purple-400 bg-purple-500/10" },
          { icon: Clock, label: "Avg Navigate Time", value: "1.2m", color: "text-amber-400 bg-amber-500/10" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="stat-card">
            <div className={`p-2 rounded-xl w-fit mb-3 ${s.color}`}><s.icon className="w-4 h-4" /></div>
            <div className="stat-value text-white">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Search & Product Finder */}
        <div className="space-y-4">
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Search className="w-4 h-4 text-cyan-400" /> AI Product Locator
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search any product..."
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/30"
              />
            </div>
            {filteredProducts.length > 0 && (
              <div className="mt-3 space-y-2">
                {filteredProducts.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => handleProductSelect(p.aisle)}
                    className="w-full text-left p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/20 hover:bg-cyan-500/5 transition-colors"
                  >
                    <div className="text-sm text-white font-medium">{p.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{p.location}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Quick Navigate Buttons */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-white mb-3">Quick Navigate</h3>
            <div className="grid grid-cols-2 gap-2">
              {STORE_AISLES.map((a) => (
                <button
                  key={a.id}
                  onClick={() => { setSelectedAisle(a.id); setShowRoute(true); }}
                  className={`p-2.5 rounded-xl text-xs font-medium border transition-all ${
                    selectedAisle === a.id
                      ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                      : "border-white/5 text-slate-400 hover:border-cyan-500/10 hover:text-white"
                  }`}
                >
                  {a.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Store Map */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" /> Interactive Store Map
            </h3>
            {showRoute && (
              <button onClick={() => { setShowRoute(false); setSelectedAisle(null); }} className="text-xs text-cyan-400 hover:text-cyan-300">
                Clear Route
              </button>
            )}
          </div>
          <div className="relative w-full aspect-[16/10] bg-slate-900/50 rounded-xl border border-white/5 overflow-hidden">
            {/* Grid */}
            <div className="absolute inset-0 grid-pattern opacity-10" />
            {/* Entrance marker */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-cyan-400 font-mono flex items-center gap-1">
              <div className="w-4 h-0.5 bg-cyan-400" /> ENTRANCE <div className="w-4 h-0.5 bg-cyan-400" />
            </div>
            {/* Aisles */}
            {STORE_AISLES.map((aisle) => (
              <motion.div
                key={aisle.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => { setSelectedAisle(aisle.id); setShowRoute(true); }}
                className={`absolute rounded-lg cursor-pointer flex items-center justify-center transition-all ${
                  selectedAisle === aisle.id
                    ? "ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/20 z-10"
                    : "hover:ring-1 hover:ring-white/20"
                }`}
                style={{
                  left: `${aisle.x}%`, top: `${aisle.y}%`,
                  width: `${aisle.w}%`, height: `${aisle.h}%`,
                  backgroundColor: `${aisle.color}20`,
                  borderColor: `${aisle.color}40`,
                  borderWidth: 1,
                }}
              >
                <div className="text-center">
                  <div className="text-xs font-semibold text-white">{aisle.name}</div>
                  <div className="text-[9px] text-white/50">{aisle.id.toUpperCase()}</div>
                </div>
              </motion.div>
            ))}
            {/* Route visualization */}
            {showRoute && selectedAisle && (
              <motion.div
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                className="absolute bottom-[12%] left-1/2 w-0.5 bg-gradient-to-t from-cyan-400 to-purple-400"
                style={{
                  height: `${70}%`,
                  boxShadow: "0 0 10px rgba(0, 229, 255, 0.5)",
                }}
              />
            )}
            {/* You Are Here */}
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
