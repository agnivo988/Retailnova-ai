"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Globe, MessageCircle, ExternalLink, ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-cyan-500/10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020510] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-black" />
              </div>
              <span className="font-bold font-[family-name:var(--font-outfit)]">
                <span className="text-white">Retail</span>
                <span className="gradient-text">Nova</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Next-generation AI retail intelligence platform for smart store automation.
            </p>
            <div className="flex gap-3">
              {[Globe, MessageCircle, ExternalLink].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-lg border border-white/5 text-slate-500 hover:text-cyan-400 hover:border-cyan-500/20 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {/* Links */}
          {[
            { title: "Platform", links: ["Dashboard", "Computer Vision", "Navigation", "Voice Assistant", "Analytics"] },
            { title: "Company", links: ["About", "Careers", "Blog", "Contact", "Partners"] },
            { title: "Resources", links: ["Documentation", "API Reference", "Status", "Support", "Changelog"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-500 hover:text-cyan-400 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5">
          <p className="text-xs text-slate-600">&copy; 2026 RetailNova AI. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-4 sm:mt-0 p-2 rounded-lg border border-white/5 text-slate-500 hover:text-cyan-400 hover:border-cyan-500/20 transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
