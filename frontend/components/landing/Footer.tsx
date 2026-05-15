"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Globe, MessageCircle, ExternalLink, ArrowUp, Send } from "lucide-react";

const FOOTER_COLS = [
  {
    title: "Intelligence",
    links: ["Computer Vision", "NLP Voice", "Crowd Analytics", "Demand Forecast"],
  },
  {
    title: "Company",
    links: ["About Nova", "Research", "Security", "Contact"],
  },
  {
    title: "Support",
    links: ["API Docs", "System Status", "Resources", "Privacy"],
  },
];

const colItem = {
  hidden:  { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export default function Footer() {
  return (
    <footer className="relative bg-[#030712] pt-[120px] lg:pt-[180px] pb-12 overflow-hidden">
      <div className="absolute inset-0 radial-ambient opacity-30 pointer-events-none" aria-hidden />

      {/* Glowing Text Divider */}
      <div className="relative flex items-center justify-center w-full mb-16 lg:mb-24 px-4">
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="absolute w-1/3 h-[1px] bg-gradient-to-r from-transparent via-purple-500/80 to-transparent blur-[2px]" />
        <div className="relative bg-[#030712] px-6 py-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
            Powering the next generation of intelligent retail
          </span>
        </div>
      </div>

      <div className="section-container relative z-10">
        {/* Rounded Footer Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="bg-[#0B0E17]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle glow inside card */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

          {/* Main Content Grid */}
          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8 mb-16">
            
            {/* 1. Brand Column */}
            <motion.div variants={colItem} className="lg:w-1/4">
              <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow duration-300">
                  <Zap className="w-5 h-5 text-black" />
                </div>
                <span className="text-lg font-black tracking-tighter font-[family-name:var(--font-orbitron)] text-white">
                  RETAIL<span className="gradient-text">NOVA</span>
                </span>
              </Link>
              <p className="text-slate-500 text-[11px] font-[family-name:var(--font-space)] leading-relaxed mb-8 max-w-[240px]">
                The world&apos;s first autonomous AI operating system for enterprise retail.
                Built for the next decade of physical commerce.
              </p>
              <div className="flex gap-3">
                {[Globe, MessageCircle, ExternalLink].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all duration-300 hover:scale-105"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* 2. Link Columns */}
            <div className="flex-1 flex flex-wrap lg:justify-center gap-12 lg:gap-24">
              {FOOTER_COLS.map((col) => (
                <motion.div key={col.title} variants={colItem}>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">
                    {col.title}
                  </h4>
                  <ul className="space-y-3.5">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-slate-400 text-[11px] hover:text-cyan-400 transition-colors duration-200 font-[family-name:var(--font-space)] block"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* 3. Stay Updated Column */}
            <motion.div variants={colItem} className="lg:w-1/4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">
                Stay Updated
              </h4>
              <p className="text-slate-400 text-[11px] font-[family-name:var(--font-space)] mb-4">
                Subscribe to our intelligence updates.
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-[#121620] border border-white/10 text-white text-[11px] font-[family-name:var(--font-space)] rounded-lg px-4 py-2.5 w-full focus:outline-none focus:border-cyan-400/50 transition-colors"
                />
                <button className="bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg px-3 py-2.5 hover:opacity-90 transition-opacity flex items-center justify-center">
                  <Send className="w-4 h-4 text-black" />
                </button>
              </div>
            </motion.div>

          </div>

          {/* Bottom Bar */}
          <motion.div
            variants={colItem}
            className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <span className="text-[10px] text-slate-500 font-[family-name:var(--font-space)]">
              &copy; 2026 RETAILNOVA AI. All rights reserved.
            </span>
            
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                System Status
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Operational
              </span>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-cyan-400 transition-colors duration-200 uppercase tracking-widest"
            >
              Back to Top
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 duration-200" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}