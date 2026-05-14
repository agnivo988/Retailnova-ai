"use client";
import { motion } from "framer-motion";
import { Thermometer, Leaf, Zap, Droplets, Recycle, TrendingDown } from "lucide-react";

export default function SustainabilityPage() {
  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-white flex items-center gap-2">
          <Leaf className="w-6 h-6 text-emerald-400" /> Sustainability Intelligence
        </h1>
        <p className="text-sm text-slate-500 mt-1">Food waste tracking • Energy efficiency • Carbon footprint</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Recycle, label: "Waste Reduced", value: "34%", color: "text-emerald-400 bg-emerald-500/10" },
          { icon: Zap, label: "Energy Saved", value: "18.2 kWh", color: "text-amber-400 bg-amber-500/10" },
          { icon: Droplets, label: "Water Usage", value: "-12%", color: "text-cyan-400 bg-cyan-500/10" },
          { icon: TrendingDown, label: "Carbon Footprint", value: "-22%", color: "text-purple-400 bg-purple-500/10" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="stat-card">
            <div className={`p-2 rounded-xl w-fit mb-3 ${s.color}`}><s.icon className="w-4 h-4" /></div>
            <div className="stat-value text-white">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Food Waste Tracker</h3>
          <div className="space-y-4">
            {[
              { category: "Produce", waste: 12, trend: "down", saved: "$2,400" },
              { category: "Dairy", waste: 8, trend: "down", saved: "$1,800" },
              { category: "Bakery", waste: 18, trend: "up", saved: "$960" },
              { category: "Meat & Seafood", waste: 6, trend: "down", saved: "$3,200" },
            ].map((item) => (
              <div key={item.category} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div>
                  <span className="text-sm text-white font-medium">{item.category}</span>
                  <p className="text-xs text-slate-500 mt-0.5">Saved: {item.saved}/month</p>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold font-mono ${item.trend === "down" ? "text-emerald-400" : "text-red-400"}`}>
                    {item.waste}%
                  </span>
                  <p className="text-[10px] text-slate-500">{item.trend === "down" ? "↓ Improving" : "↑ Needs attention"}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Energy Consumption by Zone</h3>
          <div className="space-y-4">
            {[
              { zone: "HVAC System", usage: 42, status: "optimized" },
              { zone: "Refrigeration", usage: 28, status: "optimized" },
              { zone: "Lighting", usage: 15, status: "ai-controlled" },
              { zone: "Equipment", usage: 10, status: "normal" },
              { zone: "Other", usage: 5, status: "normal" },
            ].map((z) => (
              <div key={z.zone}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">{z.zone}</span>
                  <span className="text-white font-semibold">{z.usage}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${z.usage}%` }} transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
