"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Brain,
  BarChart3,
  Navigation,
  Shield,
  Zap,
} from "lucide-react";

const LIVE_STATS = [
  { label: "Shelves Monitored", value: "2,847", icon: Eye, color: "cyan" },
  { label: "AI Predictions/hr", value: "14.2K", icon: Brain, color: "purple" },
  { label: "Revenue Optimized", value: "$2.4M", icon: BarChart3, color: "green" },
  { label: "Stores Connected", value: "156", icon: Navigation, color: "pink" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Radial gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8"
        >
          <span className="live-dot" />
          <span className="text-xs font-medium text-cyan-400 tracking-wide uppercase">
            AI-Powered Retail Intelligence — Live
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] font-[family-name:var(--font-outfit)] mb-6"
        >
          <span className="text-white">The Future of</span>
          <br />
          <span className="gradient-text">Retail Intelligence</span>
          <br />
          <span className="text-white">is Here</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed mb-10"
        >
          Next-generation AI operating system for smart retail — from computer vision
          shelf monitoring to predictive analytics, indoor navigation, and multilingual
          voice assistance.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/dashboard" className="btn-glow flex items-center gap-2 text-sm">
            Launch Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="btn-neon flex items-center gap-2 text-sm"
          >
            <Shield className="w-4 h-4" />
            Enterprise Login
          </Link>
        </motion.div>

        {/* Live Stats Grid */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {LIVE_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.03, y: -4 }}
              className="glass-card p-5 text-center group cursor-default"
            >
              <div
                className={`inline-flex p-2.5 rounded-xl mb-3 ${
                  stat.color === "cyan"
                    ? "bg-cyan-500/10 text-cyan-400"
                    : stat.color === "purple"
                    ? "bg-purple-500/10 text-purple-400"
                    : stat.color === "green"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-pink-500/10 text-pink-400"
                }`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-white mb-1 font-[family-name:var(--font-outfit)]">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />
    </section>
  );
}
