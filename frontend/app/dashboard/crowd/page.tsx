"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, AlertTriangle, TrendingUp, TrendingDown, Clock, MapPin, Thermometer } from "lucide-react";
import { MOCK_CONGESTION } from "@/lib/store";

const HEATMAP_GRID = Array.from({ length: 8 }, (_, r) =>
  Array.from({ length: 12 }, (_, c) => Math.random() * 100)
);

const ZONE_LABELS = ["Entrance", "Produce", "Dairy", "Bakery", "Checkout", "Frozen", "Electronics", "Exit"];

function getHeatColor(val: number) {
  if (val > 80) return "bg-red-500/70";
  if (val > 60) return "bg-orange-500/50";
  if (val > 40) return "bg-amber-500/40";
  if (val > 20) return "bg-emerald-500/30";
  return "bg-cyan-500/15";
}

export default function CrowdPage() {
  const [congestion, setCongestion] = useState<any[]>([]);
  const [heatmap, setHeatmap] = useState(HEATMAP_GRID);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('@/lib/api').then(({ default: api }) => {
      const fetchData = () => {
        api.get('/crowd')
          .then(res => {
            setCongestion(res.data.data || []);
            setLoading(false);
          })
          .catch(err => {
            console.error("Failed to fetch crowd data", err);
            setLoading(false);
          });
      };

      fetchData();
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    });
  }, []);

  if (loading) return <div className="flex items-center justify-center h-full text-white">Loading Crowd Intelligence...</div>;

  const avgDensity = congestion.length > 0 ? Math.round(congestion.reduce((a, z) => a + (z.density || 0), 0) / congestion.length) : 0;
  const peakZone = congestion.length > 0 ? congestion.reduce((a, z) => ((z.density || 0) > (a.density || 0) ? z : a)) : { zone: 'N/A', density: 0 };

  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-pink-400" />
          Crowd Congestion AI
        </h1>
        <p className="text-sm text-slate-500 mt-1">Real-time density analysis • Predictive heatmaps</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Avg Density", value: `${avgDensity}%`, color: "text-cyan-400 bg-cyan-500/10" },
          { icon: AlertTriangle, label: "Peak Zone", value: peakZone.zone, color: "text-red-400 bg-red-500/10" },
          { icon: Clock, label: "Next Peak", value: "18:00", color: "text-amber-400 bg-amber-500/10" },
          { icon: MapPin, label: "Zones Active", value: `${congestion.length}`, color: "text-purple-400 bg-purple-500/10" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="stat-card">
            <div className={`p-2 rounded-xl w-fit mb-3 ${s.color}`}><s.icon className="w-4 h-4" /></div>
            <div className="stat-value text-white">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Heatmap */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-red-400" /> Live Congestion Heatmap
            </h3>
            <div className="flex items-center gap-1">
              <div className="live-dot" />
              <span className="text-[10px] text-emerald-400">LIVE</span>
            </div>
          </div>
          <div className="relative">
            {/* Grid labels */}
            <div className="flex mb-1">
              {ZONE_LABELS.slice(0, 6).map((l) => (
                <span key={l} className="flex-1 text-center text-[9px] text-slate-500 truncate">{l}</span>
              ))}
            </div>
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(12, 1fr)` }}>
              {heatmap.flat().map((val, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.7, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: i * 0.01 }}
                  className={`aspect-square rounded-sm ${getHeatColor(val)} transition-colors duration-700`}
                  title={`Density: ${Math.round(val)}%`}
                />
              ))}
            </div>
            {/* Legend */}
            <div className="flex items-center justify-center gap-3 mt-4">
              {[
                { color: "bg-cyan-500/15", label: "Low" },
                { color: "bg-emerald-500/30", label: "Normal" },
                { color: "bg-amber-500/40", label: "Moderate" },
                { color: "bg-orange-500/50", label: "High" },
                { color: "bg-red-500/70", label: "Critical" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1">
                  <div className={`w-3 h-3 rounded-sm ${l.color}`} />
                  <span className="text-[10px] text-slate-500">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Zone List */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400" /> Zone-by-Zone Analysis
          </h3>
          <div className="space-y-3">
            {congestion.map((zone, i) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{zone.zone}</span>
                  <div className="flex items-center gap-1">
                    {zone.trend === "increasing" ? (
                      <TrendingUp className="w-3 h-3 text-red-400" />
                    ) : zone.trend === "decreasing" ? (
                      <TrendingDown className="w-3 h-3 text-emerald-400" />
                    ) : null}
                    <span className={`text-lg font-bold font-mono ${
                      zone.density > 70 ? "text-red-400" : zone.density > 40 ? "text-amber-400" : "text-emerald-400"
                    }`}>{Math.round(zone.density)}%</span>
                  </div>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: `${zone.density}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full rounded-full transition-colors ${
                      zone.density > 70 ? "bg-red-400" : zone.density > 40 ? "bg-amber-400" : "bg-emerald-400"
                    }`}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] text-slate-500">Current</span>
                  <span className="text-[10px] text-slate-500">Predicted: {Math.round(zone.prediction)}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
