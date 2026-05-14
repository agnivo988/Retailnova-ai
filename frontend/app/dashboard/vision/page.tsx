"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Eye, Camera, AlertTriangle, CheckCircle, XCircle,
  RefreshCw, Maximize2, Activity, TrendingUp, Layers,
} from "lucide-react";
import { MOCK_SHELVES } from "@/lib/store";

const CAMERA_FEEDS = [
  { id: "cam1", name: "Entrance - Zone A", status: "active", detections: 12, zone: "A1" },
  { id: "cam2", name: "Dairy Aisle - Zone B", status: "active", detections: 3, zone: "A2" },
  { id: "cam3", name: "Bakery Section - Zone C", status: "active", detections: 0, zone: "A3" },
  { id: "cam4", name: "Checkout Area - Zone D", status: "active", detections: 8, zone: "A4" },
  { id: "cam5", name: "Frozen Foods - Zone E", status: "warning", detections: 5, zone: "A5" },
  { id: "cam6", name: "Electronics - Zone F", status: "active", detections: 1, zone: "A6" },
];

function CameraFeed({ cam, index }: { cam: typeof CAMERA_FEEDS[0]; index: number }) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 500);
    }, 3000 + index * 700);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card overflow-hidden group"
    >
      {/* Simulated Camera View */}
      <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        {/* Scan line */}
        <motion.div
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
        />
        {/* Detection boxes */}
        {cam.detections > 0 && (
          <>
            <motion.div
              animate={{ opacity: pulse ? 1 : 0.6 }}
              className="absolute top-[20%] left-[15%] w-[30%] h-[40%] border-2 border-cyan-400/60 rounded-lg"
            >
              <span className="absolute -top-5 left-0 text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded">
                SHELF {cam.zone} • {cam.detections > 5 ? "LOW" : "OK"}
              </span>
            </motion.div>
            <motion.div
              animate={{ opacity: pulse ? 0.8 : 0.4 }}
              className="absolute top-[30%] right-[10%] w-[25%] h-[35%] border-2 border-purple-400/50 rounded-lg"
            >
              <span className="absolute -top-5 right-0 text-[10px] font-mono text-purple-400 bg-purple-400/10 px-1.5 py-0.5 rounded">
                PRODUCT ID
              </span>
            </motion.div>
          </>
        )}
        {/* Status overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${cam.status === "active" ? "bg-emerald-400 animate-pulse" : "bg-amber-400 animate-pulse"}`} />
          <span className="text-[10px] font-mono text-white/70 uppercase">{cam.status}</span>
        </div>
        <div className="absolute top-3 right-3 text-[10px] font-mono text-white/40">
          {new Date().toLocaleTimeString()}
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Maximize2 className="w-6 h-6 text-white/80" />
        </div>
      </div>
      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-white">{cam.name}</h4>
          <span className="text-xs font-mono text-cyan-400">{cam.detections} detections</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function VisionPage() {
  const [selectedView, setSelectedView] = useState<"grid" | "analytics">("grid");

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-white flex items-center gap-2">
            <Eye className="w-6 h-6 text-cyan-400" />
            Computer Vision System
          </h1>
          <p className="text-sm text-slate-500 mt-1">AI-powered shelf monitoring • YOLO + OpenCV</p>
        </div>
        <div className="flex gap-2">
          {(["grid", "analytics"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setSelectedView(v)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors capitalize ${
                selectedView === v
                  ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-400 border border-white/5 hover:border-cyan-500/10"
              }`}
            >
              {v === "grid" ? "Camera Grid" : "Analytics"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Camera, label: "Active Cameras", value: "6/6", color: "text-emerald-400 bg-emerald-500/10" },
          { icon: AlertTriangle, label: "Shelf Alerts", value: "3", color: "text-red-400 bg-red-500/10" },
          { icon: Activity, label: "Detection Rate", value: "96.4%", color: "text-cyan-400 bg-cyan-500/10" },
          { icon: TrendingUp, label: "Accuracy", value: "98.7%", color: "text-purple-400 bg-purple-500/10" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="stat-card"
          >
            <div className={`p-2 rounded-xl w-fit mb-3 ${s.color}`}>
              <s.icon className="w-4 h-4" />
            </div>
            <div className="stat-value text-white">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {selectedView === "grid" ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {CAMERA_FEEDS.map((cam, i) => (
            <CameraFeed key={cam.id} cam={cam} index={i} />
          ))}
        </div>
      ) : (
        /* Shelf Health Analytics */
        <div className="space-y-4">
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Shelf Occupancy Analysis
            </h3>
            <div className="space-y-4">
              {MOCK_SHELVES.map((shelf, i) => (
                <motion.div
                  key={shelf.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <div className="w-16 text-center">
                    <span className={`text-2xl font-bold font-mono ${
                      shelf.healthScore > 70 ? "text-emerald-400" :
                      shelf.healthScore > 30 ? "text-amber-400" : "text-red-400"
                    }`}>{shelf.healthScore}</span>
                    <p className="text-[10px] text-slate-500 uppercase">Health</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{shelf.section} — {shelf.aisle}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        shelf.status === "optimal" ? "bg-emerald-500/20 text-emerald-400" :
                        shelf.status === "low" ? "bg-amber-500/20 text-amber-400" :
                        "bg-red-500/20 text-red-400"
                      }`}>{shelf.status}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${shelf.occupancy}%` }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        className={`h-full rounded-full ${
                          shelf.occupancy > 70 ? "bg-emerald-400" :
                          shelf.occupancy > 30 ? "bg-amber-400" : "bg-red-400"
                        }`}
                      />
                    </div>
                    <div className="flex gap-2 mt-1.5">
                      {shelf.products.map((p) => (
                        <span key={p} className="text-[10px] text-slate-500">{p}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
