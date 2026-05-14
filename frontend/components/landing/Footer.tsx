"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Globe, MessageCircle, ExternalLink, ArrowUp, Cpu, Shield, Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#030712] pt-24 pb-12 border-t border-white/5 overflow-hidden">
      <div className="container-center relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-black tracking-tighter font-[family-name:var(--font-orbitron)] text-white">
                RETAIL<span className="gradient-text">NOVA</span>
              </span>
            </Link>
            <p className="max-w-xs text-slate-500 text-sm font-[family-name:var(--font-space)] leading-relaxed mb-8">
              The world&apos;s first autonomous AI operating system for enterprise retail. 
              Built for the next decade of physical commerce.
            </p>
            <div className="flex gap-4">
              {[Globe, MessageCircle, ExternalLink].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { 
              title: "Intelligence", 
              links: ["Computer Vision", "NLP Voice", "Crowd Analytics", "Demand Forecast"] 
            },
            { 
              title: "Company", 
              links: ["About Nova", "Research", "Security", "Contact"] 
            },
            { 
              title: "Support", 
              links: ["API Docs", "System Status", "Resources", "Privacy"] 
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-500 text-sm hover:text-cyan-400 transition-colors font-[family-name:var(--font-space)]">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">&copy; 2026 RETAILNOVA AI</span>
            <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3 text-emerald-500/50" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Global Ops: Normal</span>
            </div>
          </div>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-[0.2em]"
          >
            Back to Top
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-cyan-500/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
    </footer>
  );
}
