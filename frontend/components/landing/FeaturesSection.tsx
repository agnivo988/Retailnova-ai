"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Eye, Brain, BarChart3, Navigation, Mic, Shield,
  Users, TrendingUp, Boxes, Thermometer,
  MapPin, Sparkles,
} from "lucide-react";

const FEATURES = [
  {
    icon: Eye,
    title: "Computer Vision",
    desc: "AI-powered shelf monitoring with YOLO & OpenCV. Detect empty shelves, low stock, and anomalies in real time.",
    color: "from-cyan-500 to-blue-500",
    glow: "cyan",
  },
  {
    icon: Brain,
    title: "Predictive Intelligence",
    desc: "Demand forecasting, trend analysis, and AI-driven inventory optimization for maximum revenue.",
    color: "from-purple-500 to-pink-500",
    glow: "purple",
  },
  {
    icon: BarChart3,
    title: "Retail Analytics",
    desc: "Live dashboards with revenue tracking, customer engagement metrics, and operational KPIs.",
    color: "from-emerald-500 to-cyan-500",
    glow: "green",
  },
  {
    icon: Navigation,
    title: "Smart Navigation",
    desc: "Indoor store mapping with AI routing, congestion-aware paths, and accessibility optimization.",
    color: "from-blue-500 to-indigo-500",
    glow: "blue",
  },
  {
    icon: Mic,
    title: "Voice Assistant",
    desc: "Multilingual AI assistant supporting 6+ languages with NLP, sentiment analysis, and product search.",
    color: "from-pink-500 to-rose-500",
    glow: "pink",
  },
  {
    icon: Shield,
    title: "Security & Safety",
    desc: "AI theft detection, smart evacuation routing, and real-time security monitoring across all zones.",
    color: "from-amber-500 to-orange-500",
    glow: "amber",
  },
  {
    icon: Users,
    title: "Crowd Analytics",
    desc: "Heatmap visualization, queue estimation, peak-hour forecasting, and smart crowd redistribution.",
    color: "from-teal-500 to-emerald-500",
    glow: "teal",
  },
  {
    icon: TrendingUp,
    title: "AI Restocking",
    desc: "Automated urgency scoring, priority-based restocking tasks, and staff assignment optimization.",
    color: "from-violet-500 to-purple-500",
    glow: "violet",
  },
  {
    icon: Boxes,
    title: "Digital Twin",
    desc: "Virtual real-time store simulation with 3D visualization of inventory, layouts, and operations.",
    color: "from-sky-500 to-blue-500",
    glow: "sky",
  },
  {
    icon: Thermometer,
    title: "Sustainability",
    desc: "Track food waste, energy efficiency, and operational sustainability with AI-driven optimization.",
    color: "from-green-500 to-emerald-500",
    glow: "green",
  },
  {
    icon: MapPin,
    title: "Product Locator",
    desc: "Instant AI product search with aisle mapping, QR scanning, and voice-guided navigation.",
    color: "from-rose-500 to-pink-500",
    glow: "rose",
  },
  {
    icon: Sparkles,
    title: "Hyper-Personalization",
    desc: "Customer-specific shopping experiences with AI recommendations, smart offers, and loyalty rewards.",
    color: "from-yellow-500 to-amber-500",
    glow: "yellow",
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 overflow-hidden" id="features">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-cyan-400/70 mb-4 block">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-4">
            <span className="text-white">Powered by </span>
            <span className="gradient-text">Advanced AI</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            A comprehensive suite of AI modules designed to revolutionize every aspect of retail operations.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card p-6 group cursor-default relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-[0.03] transition-opacity" />
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${f.color} mb-4 shadow-lg`}>
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
