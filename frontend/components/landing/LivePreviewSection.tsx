"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  AlertTriangle, TrendingUp, Users, Activity,
  Eye, ShoppingCart, Zap, BarChart, Server
} from "lucide-react";

const LIVE_ALERTS = [
  { icon: AlertTriangle, text: "Shelf A7-B empty", severity: "critical", time: "2m ago" },
  { icon: TrendingUp, text: "Demand ↑ 34% predicted", severity: "info", time: "5m ago" },
  { icon: Users, text: "Zone 3 Congestion", severity: "warning", time: "8m ago" },
  { icon: Eye, text: "Camera C3 restored", severity: "success", time: "12m ago" },
];

export default function LivePreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-spacing relative bg-[#030712]" ref={ref}>
      <div className="container-center relative z-10">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
          >
            Intelligence Hub
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white font-[family-name:var(--font-orbitron)] mb-6">
            LIVE AI <span className="gradient-text">ECOSYSTEM</span>
          </h2>
        </div>

        <div className="relative glass-strong border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {/* Mock Header */}
          <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">System Dashboard v2.0.4</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase">Live Connection</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 divide-x divide-white/10 h-full">
            {/* Sidebar Stats */}
            <div className="p-6 space-y-6">
              {[
                { label: "Active Sensors", value: "2,482", icon: Server, color: "text-cyan-400" },
                { label: "AI Inference", value: "99.4%", icon: Activity, color: "text-purple-400" },
                { label: "Daily Revenue", value: "$48.2K", icon: BarChart, color: "text-emerald-400" },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-500">
                    <stat.icon className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">{stat.label}</span>
                  </div>
                  <div className="text-xl font-black text-white font-mono">{stat.value}</div>
                </div>
              ))}
              
              <div className="pt-6 border-t border-white/5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 block">System Health</span>
                <div className="space-y-3">
                  {[
                    { label: "CV Engine", value: 92 },
                    { label: "NLP Service", value: 88 },
                    { label: "Data Pipeline", value: 96 },
                  ].map((s, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400">
                        <span>{s.label}</span>
                        <span>{s.value}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.value}%` }}
                          className="h-full bg-cyan-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Preview Area */}
            <div className="lg:col-span-2 bg-black/40 p-8">
              <div className="aspect-video relative rounded-2xl overflow-hidden border border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                  <Eye className="w-3 h-3 text-cyan-400" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Zone 04 - Shelf Cam</span>
                </div>
                
                {/* AI Detection Overlays */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-1/4 left-1/3 w-32 h-40 border-2 border-cyan-400/50 rounded-lg"
                >
                  <span className="absolute -top-6 left-0 text-[10px] font-bold text-cyan-400 bg-black/80 px-1 rounded">Product: Milk (98%)</span>
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  className="absolute bottom-1/4 right-1/4 w-40 h-32 border-2 border-purple-400/50 rounded-lg"
                >
                  <span className="absolute -top-6 left-0 text-[10px] font-bold text-purple-400 bg-black/80 px-1 rounded">Stock Level: 12%</span>
                </motion.div>

                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { label: "Zone Traffic", val: "+12.4%", desc: "vs yesterday" },
                  { label: "Stock Urgency", val: "CRITICAL", desc: "6 items low" },
                  { label: "Staff Sync", val: "ACTIVE", desc: "4 on floor" },
                ].map((x, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">{x.label}</div>
                    <div className="text-sm font-black text-white font-mono">{x.val}</div>
                    <div className="text-[9px] text-slate-500 uppercase mt-1">{x.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications Feed */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Incident Log</span>
              </div>
              <div className="space-y-4">
                {LIVE_ALERTS.map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${
                      a.severity === 'critical' ? 'bg-red-500' :
                      a.severity === 'warning' ? 'bg-amber-500' : 'bg-cyan-500'
                    }`} />
                    <div className="space-y-1">
                      <p className="text-xs text-white font-medium">{a.text}</p>
                      <span className="text-[9px] text-slate-500 font-bold uppercase">{a.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest hover:bg-white/10 transition-colors">
                View All Intelligence
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.05)_0%,transparent_70%)]" />
    </section>
  );
}
