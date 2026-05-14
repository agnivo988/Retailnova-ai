"use client";
import { motion } from "framer-motion";
import { Map, Box, Layers, RotateCcw } from "lucide-react";

export default function DigitalTwinPage() {
  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-white flex items-center gap-2">
          <Map className="w-6 h-6 text-violet-400" /> Digital Twin Store
        </h1>
        <p className="text-sm text-slate-500 mt-1">Virtual store simulation • Real-time 3D mapping</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Box, label: "Mapped Zones", value: "48", color: "text-cyan-400 bg-cyan-500/10" },
          { icon: Layers, label: "3D Assets", value: "1,240", color: "text-purple-400 bg-purple-500/10" },
          { icon: RotateCcw, label: "Last Sync", value: "Live", color: "text-emerald-400 bg-emerald-500/10" },
          { icon: Map, label: "Floor Area", value: "45K sqft", color: "text-amber-400 bg-amber-500/10" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="stat-card">
            <div className={`p-2 rounded-xl w-fit mb-3 ${s.color}`}><s.icon className="w-4 h-4" /></div>
            <div className="stat-value text-white">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>
      {/* 3D View Placeholder */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <h3 className="text-sm font-semibold text-white mb-4">3D Store Visualization</h3>
        <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-slate-900 via-[#0a0f1e] to-slate-900 rounded-xl border border-white/5 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          {/* Simulated 3D isometric store layout */}
          <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full">
            {/* Floor */}
            <polygon points="400,380 100,250 400,120 700,250" fill="rgba(0,229,255,0.03)" stroke="rgba(0,229,255,0.1)" strokeWidth="1"/>
            {/* Shelves - isometric blocks */}
            {[
              { x: 200, y: 200, w: 80, h: 30, label: "Produce", color: "#10b981" },
              { x: 320, y: 175, w: 80, h: 30, label: "Dairy", color: "#3b82f6" },
              { x: 440, y: 200, w: 80, h: 30, label: "Bakery", color: "#f59e0b" },
              { x: 560, y: 225, w: 80, h: 30, label: "Beverages", color: "#06b6d4" },
              { x: 230, y: 280, w: 80, h: 30, label: "Frozen", color: "#8b5cf6" },
              { x: 380, y: 260, w: 120, h: 25, label: "Checkout", color: "#f97316" },
              { x: 530, y: 300, w: 80, h: 30, label: "Electronics", color: "#a855f7" },
            ].map((block, i) => (
              <g key={i}>
                {/* Block top face */}
                <rect x={block.x} y={block.y - block.h} width={block.w} height={block.h} rx="4"
                  fill={`${block.color}20`} stroke={`${block.color}40`} strokeWidth="1" />
                {/* Label */}
                <text x={block.x + block.w / 2} y={block.y - block.h / 2 + 4} textAnchor="middle"
                  fill={block.color} fontSize="10" fontFamily="monospace">{block.label}</text>
              </g>
            ))}
            {/* Animated dot - customer */}
            <circle r="4" fill="#00e5ff">
              <animateMotion dur="8s" repeatCount="indefinite" path="M200,260 Q300,230 400,250 Q500,270 550,280 Q450,290 350,270 Q250,250 200,260" />
            </circle>
            <circle r="3" fill="#a855f7">
              <animateMotion dur="10s" repeatCount="indefinite" path="M500,240 Q400,220 300,240 Q350,260 450,250 Q550,230 500,240" />
            </circle>
          </svg>
          <div className="absolute bottom-4 right-4 flex gap-2">
            <span className="px-2 py-1 rounded bg-black/50 text-[10px] text-cyan-400 font-mono flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> 2 customers tracked
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
