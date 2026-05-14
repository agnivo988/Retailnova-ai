"use client";

import { motion } from "framer-motion";
import { 
  Eye, Brain, BarChart3, Navigation, 
  Shield, Zap, Users, MessageSquare, 
  Cpu, Globe, Lock, Share2
} from "lucide-react";

const FEATURES = [
  {
    title: "Computer Vision AI",
    desc: "Real-time shelf monitoring and object detection with 99.4% accuracy.",
    icon: Eye,
    color: "cyan"
  },
  {
    title: "Demand Forecasting",
    desc: "Predictive inventory management powered by deep learning models.",
    icon: Brain,
    color: "purple"
  },
  {
    title: "Crowd Intelligence",
    desc: "Interactive heatmaps and congestion analytics for store optimization.",
    icon: Users,
    color: "pink"
  },
  {
    title: "Smart Navigation",
    desc: "Holographic indoor mapping and product locator for customers.",
    icon: Navigation,
    color: "blue"
  },
  {
    title: "Voice Assistant",
    desc: "Multilingual NLP-driven support assistant across 6+ languages.",
    icon: MessageSquare,
    color: "emerald"
  },
  {
    title: "Enterprise Security",
    desc: "Advanced threat detection and secure access control systems.",
    icon: Shield,
    color: "amber"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
          >
            Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white font-[family-name:var(--font-orbitron)] mb-6"
          >
            POWERED BY <span className="gradient-text">NEXT-GEN AI</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-slate-400 text-lg font-[family-name:var(--font-space)]"
          >
            A unified ecosystem of intelligence modules designed to transform 
            traditional retail into autonomous smart environments.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="glass-card p-8 group cursor-default"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                f.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' :
                f.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                f.color === 'pink' ? 'bg-pink-500/10 text-pink-400' :
                f.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                f.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                'bg-amber-500/10 text-amber-400'
              }`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-[family-name:var(--font-orbitron)] mb-3">{f.title}</h3>
              <p className="text-sm text-slate-400 font-[family-name:var(--font-space)] leading-relaxed">{f.desc}</p>
              
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest group-hover:text-cyan-400/50 transition-colors">Module Active</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    </section>
  );
}
