"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Sparkles, Activity, Layers } from "lucide-react";
import dynamic from "next/dynamic";

const HeroVisualization = dynamic(() => import("./HeroVisualization"), { ssr: false });

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side Content */}
          <div className="relative z-10 text-left">
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

          {/* Right Side 3D/Visuals */}
          <div className="relative h-[500px] lg:h-[600px] w-full hidden lg:block">
            <HeroVisualization />
            
            {/* Floating UI Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 right-10 glass p-4 rounded-2xl border-cyan-500/30 z-20"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Live Analysis</span>
              </div>
              <div className="h-12 w-32 bg-white/5 rounded-lg flex items-end gap-1 p-2">
                {[40, 70, 45, 90, 65, 80].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    className="flex-1 bg-cyan-400/40 rounded-t-sm"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
