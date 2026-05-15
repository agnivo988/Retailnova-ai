"use client";

import { motion } from "framer-motion";
import {
  Eye, Brain, Users, Navigation,
  Shield, MessageSquare,
} from "lucide-react";

const FEATURES = [
  { title: "Computer Vision AI",   desc: "Real-time shelf monitoring and object detection with 99.4% accuracy.",           icon: Eye,          color: "cyan"    },
  { title: "Demand Forecasting",   desc: "Predictive inventory management powered by deep learning models.",               icon: Brain,        color: "purple"  },
  { title: "Crowd Intelligence",   desc: "Interactive heatmaps and congestion analytics for store optimization.",          icon: Users,        color: "pink"    },
  { title: "Smart Navigation",     desc: "Holographic indoor mapping and product locator for customers.",                  icon: Navigation,   color: "blue"    },
  { title: "Voice Assistant",      desc: "Multilingual NLP-driven support assistant across 6+ languages.",                icon: MessageSquare, color: "emerald" },
  { title: "Enterprise Security",  desc: "Advanced threat detection and secure access control systems.",                   icon: Shield,       color: "amber"   },
];

const ICON_STYLES: Record<string, { bg: string; text: string; glow: string }> = {
  cyan:    { bg: "bg-cyan-500/10",    text: "text-cyan-400",    glow: "rgba(0,229,255,0.25)"    },
  purple:  { bg: "bg-purple-500/10",  text: "text-purple-400",  glow: "rgba(168,85,247,0.25)"   },
  pink:    { bg: "bg-pink-500/10",    text: "text-pink-400",    glow: "rgba(236,72,153,0.25)"   },
  blue:    { bg: "bg-blue-500/10",    text: "text-blue-400",    glow: "rgba(59,130,246,0.25)"   },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", glow: "rgba(16,185,129,0.25)"   },
  amber:   { bg: "bg-amber-500/10",   text: "text-amber-400",   glow: "rgba(245,158,11,0.25)"   },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export default function FeaturesSection() {
  return (
    <section className="py-32 relative overflow-hidden">

      {/* Top gradient connector from hero */}
      <div className="absolute top-0 left-0 right-0 section-divider" aria-hidden />

      <div className="section-container relative z-10">

        {/* Section heading */}
        <div className="w-full flex flex-col items-center justify-center text-center mb-16 mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-5"
          >
            Capabilities
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full max-w-4xl mx-auto text-4xl md:text-5xl font-black text-white font-[family-name:var(--font-orbitron)] mb-6 text-center"
          >
            POWERED BY <span className="gradient-text">NEXT-GEN AI</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full max-w-2xl mx-auto text-slate-400 text-lg font-[family-name:var(--font-space)] leading-relaxed text-center"
          >
            A unified ecosystem of intelligence modules designed to transform
            traditional retail into autonomous smart environments.
          </motion.p>
        </div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {FEATURES.map((f) => {
            const style = ICON_STYLES[f.color];
            return (
              <motion.div
                key={f.title}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02, boxShadow: "0 12px 30px rgba(0,0,0,0.3)" }}
                className="glass-card card-glow animated-border glass-inner-highlight p-10 group cursor-default rounded-2xl"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-400 group-hover:scale-110 ${style.bg} ${style.text}`}
                  style={{ transition: "box-shadow 0.3s ease, transform 0.3s ease" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${style.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <f.icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-orbitron)] mb-3">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-400 font-[family-name:var(--font-space)] leading-relaxed">
                  {f.desc}
                </p>

                {/* Card footer */}
                <div className="mt-7 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest group-hover:text-cyan-400/60 transition-colors duration-300">
                    Module Active
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse-neon" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Decorative glows — fully contained */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -z-[1]" aria-hidden />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -z-[1]" aria-hidden />

      {/* Bottom gradient into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, #030712 0%, transparent 100%)" }}
        aria-hidden
      />
    </section>
  );
}