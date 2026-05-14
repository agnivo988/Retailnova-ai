"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Sparkles, Activity, Layers } from "lucide-react";
import dynamic from "next/dynamic";

const HeroVisualization = dynamic(() => import("./HeroVisualization"), { ssr: false });

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden bg-[#030712]">
      <div className="container-center relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center justify-center">
          
          {/* Left Side Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] font-bold text-cyan-400 tracking-[0.2em] uppercase">
                Enterprise AI Retail OS v2.0
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.1] font-[family-name:var(--font-orbitron)] mb-6"
            >
              <span className="text-white">REINVENTING</span><br />
              <span className="gradient-text">RETAIL WORLD</span><br />
              <span className="text-white/80">WITH AI.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-xl text-lg text-slate-400 font-[family-name:var(--font-space)] leading-relaxed mb-10"
            >
              The most advanced AI retail intelligence platform. Real-time shelf analysis, 
              predictive demand forecasting, and autonomous store operations in one 
              unified holographic ecosystem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link href="/dashboard" className="btn-glow flex items-center gap-2 group">
                ENTER DASHBOARD
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/login" className="btn-neon flex items-center gap-2">
                <Shield className="w-4 h-4" />
                SECURITY PORTAL
              </Link>
            </motion.div>

            {/* Live Status Indicators */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/5">
              {[
                { label: "AI INFERENCE", value: "99.4%", icon: Activity, color: "text-emerald-400" },
                { label: "SENSORS ACTIVE", value: "2,482", icon: Layers, color: "text-cyan-400" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className={`p-2 rounded-lg bg-white/5 ${item.color}`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-bold tracking-wider">{item.label}</div>
                    <div className="text-lg font-bold text-white font-mono">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side Cinematic 3D Scene */}
          <div className="relative h-[500px] sm:h-[600px] lg:h-[800px] xl:h-[900px] w-full lg:block">
            <div className="absolute inset-0 z-0">
              <HeroVisualization />
            </div>
            
            {/* Immersive HUD Overlay */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute top-0 right-0 sm:right-4 xl:right-10 glass-strong p-6 rounded-2xl border-white/10 z-10 hidden md:block backdrop-blur-3xl shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,1)]" />
                <span className="text-[11px] font-black text-white uppercase tracking-[0.2em] font-[family-name:var(--font-orbitron)]">
                  OS_CORE_ACTIVE
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex items-end gap-1.5 h-20 w-48">
                  {[40, 70, 45, 90, 65, 80, 55, 95, 40, 60].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 1.2 + i * 0.05, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                      className="flex-1 bg-gradient-to-t from-cyan-500/10 to-cyan-400/80 rounded-t-sm shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                    />
                  ))}
                </div>
                <div className="pt-4 border-t border-white/5">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    <span>Neural Link</span>
                    <span className="text-cyan-400">Stable</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-1/3 h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
