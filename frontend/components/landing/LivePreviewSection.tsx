"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  AlertTriangle, TrendingUp, Users, Activity,
  Eye, Zap, BarChart, Server,
} from "lucide-react";

const LIVE_ALERTS = [
  { icon: AlertTriangle, text: "Shelf A7-B empty",        severity: "critical", time: "2m ago"  },
  { icon: TrendingUp,    text: "Demand ↑ 34% predicted",  severity: "info",     time: "5m ago"  },
  { icon: Users,         text: "Zone 3 Congestion",        severity: "warning",  time: "8m ago"  },
  { icon: Eye,           text: "Camera C3 restored",       severity: "success",  time: "12m ago" },
];

const SEVERITY_DOT: Record<string, string> = {
  critical: "bg-red-500",
  warning:  "bg-amber-500",
  info:     "bg-cyan-500",
  success:  "bg-emerald-500",
};

export default function LivePreviewSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section ref={ref} className="relative pt-32 pb-48 lg:pb-64 overflow-hidden">
      {/* Top gradient connector */}
      <div className="absolute top-0 left-0 right-0 section-divider" aria-hidden />

      {/* Subtle purple radial bg */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none -z-[1]"
        style={{ background: "radial-gradient(circle at 70% 30%, rgba(168,85,247,0.04) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="section-container relative z-10">

        {/* Section heading */}
        <div className="w-full flex flex-col items-center justify-center text-center mb-20 mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-5"
          >
            Intelligence Hub
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full max-w-4xl mx-auto text-4xl md:text-5xl font-black text-white font-[family-name:var(--font-orbitron)] mb-6 text-center"
          >
            LIVE AI <span className="gradient-text">ECOSYSTEM</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full max-w-3xl mx-auto text-slate-400 text-base font-[family-name:var(--font-space)] leading-relaxed text-center"
          >
            A real-time intelligence dashboard monitoring every corner of your retail ecosystem —
            live, 24/7, at enterprise scale.
          </motion.p>
        </div>

        {/* Dashboard panel */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(15px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative glass-strong border border-white/8 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,229,255,0.08)]"
        >
          {/* Glass Reflection Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent pointer-events-none" />
          {/* Mock title bar */}
          <div className="bg-white/5 border-b border-white/8 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">
                RetailNova System Dashboard v2.0.4
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Live Connection</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 p-2 divide-y lg:divide-y-0 lg:divide-x divide-white/8">

            {/* Sidebar stats */}
            <div className="p-6 space-y-7">
              {[
                { label: "Active Sensors", value: "2,482",  icon: Server,   color: "text-cyan-400"    },
                { label: "AI Inference",   value: "99.4%",  icon: Activity, color: "text-purple-400"  },
                { label: "Daily Revenue",  value: "$48.2K", icon: BarChart,  color: "text-emerald-400" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="space-y-1"
                >
                  <div className={`flex items-center gap-2 text-slate-500 ${stat.color}`}>
                    <stat.icon className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">{stat.label}</span>
                  </div>
                  <div className="text-xl font-black text-white font-mono">{stat.value}</div>
                </motion.div>
              ))}

              {/* System health bars */}
              <div className="pt-6 border-t border-white/5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 block">
                  System Health
                </span>
                <div className="space-y-3">
                  {[
                    { label: "CV Engine",      value: 92 },
                    { label: "NLP Service",    value: 88 },
                    { label: "Data Pipeline",  value: 96 },
                  ].map((s, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400">
                        <span>{s.label}</span>
                        <span>{s.value}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${s.value}%` } : {}}
                          transition={{ delay: 0.6 + i * 0.15, duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full relative"
                        >
                          <motion.div
                            animate={{ opacity: [0, 1, 0], x: ["0%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.3, ease: "linear" }}
                            className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                          />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main camera preview */}
            <div className="lg:col-span-2 bg-black/40 p-7">
              <div className="aspect-video relative rounded-2xl overflow-hidden border border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md z-10">
                  <Eye className="w-3 h-3 text-cyan-400" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Zone 04 — Shelf Cam</span>
                </div>

                {/* AI detection overlays */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.85, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-1/4 left-1/3 w-32 h-40 border-2 border-cyan-400/50 rounded-lg"
                >
                  <span className="absolute -top-6 left-0 text-[10px] font-bold text-cyan-400 bg-black/80 px-1.5 py-0.5 rounded">
                    Product: Milk (98%)
                  </span>
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.65, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  className="absolute bottom-1/4 right-1/4 w-40 h-32 border-2 border-purple-400/50 rounded-lg"
                >
                  <span className="absolute -top-6 left-0 text-[10px] font-bold text-purple-400 bg-black/80 px-1.5 py-0.5 rounded">
                    Stock Level: 12%
                  </span>
                </motion.div>

                {/* Scanline overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.22)_50%)] bg-[length:100%_3px]" />
                <div
                  className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-10 w-full"
                  style={{ animation: "scan-line 6s linear infinite" }}
                />
              </div>

              {/* Mini stat cards */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { label: "Zone Traffic",  val: "+12.4%", desc: "vs yesterday" },
                  { label: "Stock Urgency", val: "CRITICAL", desc: "6 items low" },
                  { label: "Staff Sync",    val: "ACTIVE",  desc: "4 on floor"  },
                ].map((x, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">{x.label}</div>
                    <div className="text-sm font-black text-white font-mono">{x.val}</div>
                    <div className="text-[9px] text-slate-500 uppercase mt-1">{x.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Incident log */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-7">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Incident Log</span>
              </div>

              <div className="space-y-5">
                {LIVE_ALERTS.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.45 }}
                    className="flex gap-3"
                  >
                    <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${SEVERITY_DOT[a.severity]}`} />
                    <div className="space-y-1">
                      <p className="text-xs text-white font-medium leading-snug">{a.text}</p>
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{a.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="w-full mt-10 py-3 rounded-xl bg-white/5 border border-white/8 text-[10px] font-bold text-white uppercase tracking-widest hover:bg-white/10 hover:border-cyan-400/20 transition-all duration-300">
                View All Intelligence
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/4 rounded-full blur-[120px] pointer-events-none -z-[1]" aria-hidden />
    </section>
  );
}