"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Sparkles, Activity, Layers, AlertTriangle } from "lucide-react";
import dynamic from "next/dynamic";

const HeroVisualization = dynamic(() => import("./HeroVisualization"), { ssr: false });

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Subtle scroll parallax — text drifts up slightly, sphere drifts slower
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const sphereY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={sectionRef} className="relative pt-[140px] md:pt-[180px] lg:pt-[220px] pb-28 overflow-hidden">
      {/* ── Vignette & Ambient Glow ── */}
      <div className="absolute inset-0 vignette z-20 pointer-events-none" aria-hidden />
      <div className="absolute inset-0 radial-ambient -z-10" aria-hidden />

      {/* ── Animated hero grid background ── */}
      <div className="absolute inset-0 hero-grid pointer-events-none -z-10" aria-hidden />

      {/* ── Bottom gradient fade into next section ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #030712 0%, transparent 100%)" }}
        aria-hidden
      />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-16 items-center">

          {/* ──────────── LEFT COLUMN ──────────── */}
          <motion.div
            style={{ y: textY, opacity }}
            className="relative z-10 flex flex-col items-start text-left max-w-lg mr-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-7"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] font-bold text-cyan-400 tracking-[0.2em] uppercase">
                Enterprise AI Retail OS v2.0
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.12, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const }}
              className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.1] font-[family-name:var(--font-orbitron)] mb-8"
            >
              <span className="text-white">REINVENTING</span>
              <br />
              <span className="gradient-text">RETAIL WORLD</span>
              <br />
              <span className="text-white/80">WITH AI.</span>
            </motion.h1>

            {/* Sub-text */}
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.22, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const }}
              className="max-w-md text-lg text-slate-400 font-[family-name:var(--font-space)] leading-relaxed mb-12"
            >
              The most advanced AI retail intelligence platform. Real-time shelf analysis,
              predictive demand forecasting, and autonomous store operations in one
              unified holographic ecosystem.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const }}
              className="flex flex-wrap gap-6 mb-16"
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid grid-cols-2 gap-6 pt-8 border-t border-white/5 w-full max-w-xs"
            >
              {[
                { label: "AI INFERENCE", value: "99.4%", icon: Activity, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                { label: "SENSORS ACTIVE", value: "2,482", icon: Layers, color: "text-cyan-400", bg: "bg-cyan-500/10" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.56 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold tracking-wider">{item.label}</div>
                    <div className="text-lg font-bold text-white font-mono">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ──────────── RIGHT COLUMN (desktop only) ──────────── */}
          <div className="relative hidden lg:flex items-center justify-center">
            <motion.div
              style={{ y: sphereY, x: "-8%", willChange: "transform" }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] as const }}
              className="relative w-full aspect-square animate-float-slow"
            >
              {/* Outer pulsing glow ring */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ animation: "glow-ring 4s ease-in-out infinite" }}
                aria-hidden
              />

              {/* Orbit rings */}
              <div className="absolute inset-6 rounded-full border border-cyan-400/10 animate-orbit-slow pointer-events-none" aria-hidden />
              <div className="absolute inset-12 rounded-full border border-purple-400/08 animate-orbit-rev pointer-events-none" aria-hidden />

              {/* 3D sphere */}
              <HeroVisualization />

              {/* ── Floating HUD: Live Analysis ── */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[6%] right-[-2%] glass p-4 rounded-2xl z-20 shadow-xl opacity-90"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Analysis</span>
                </div>
                <div className="h-12 w-32 bg-white/5 rounded-lg flex items-end gap-1 p-2">
                  {[40, 70, 45, 90, 65, 80].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.8 + i * 0.06, duration: 0.5 }}
                      className="flex-1 bg-cyan-400/40 rounded-t-sm"
                    />
                  ))}
                </div>
              </motion.div>

              {/* ── Floating HUD: AI Confidence ── */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[10%] left-[-2%] glass p-3 rounded-xl z-20 shadow-xl opacity-90"
              >
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">AI Confidence</div>
                <div className="text-xl font-black text-white font-mono">99.4%</div>
                <div className="mt-2 h-1.5 w-28 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "99.4%" }}
                    transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                  />
                </div>
              </motion.div>

              {/* ── Floating HUD: Shelf Alert ── */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-[40%] left-[-8%] glass p-3 rounded-xl z-20 shadow-xl opacity-80"
              >
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Shelf Alert</span>
                </div>
                <div className="text-[11px] text-white font-mono">Zone A7 · Low Stock</div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Ambient glows */}
      <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none -z-[1]"
        style={{ background: "radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)", filter: "blur(70px)" }}
        aria-hidden
      />
      <div className="absolute bottom-1/4 -right-24 w-[350px] h-[350px] rounded-full pointer-events-none -z-[1]"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)", filter: "blur(70px)" }}
        aria-hidden
      />
    </section>
  );
}
