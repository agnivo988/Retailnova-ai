"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Zap, ChevronDown, Bell, LogIn, Activity } from "lucide-react";

const NAV_LINKS = [
  { label: "Platform", href: "/dashboard" },
  { label: "Vision", href: "/dashboard/vision" },
  { label: "Crowd", href: "/dashboard/crowd" },
  { label: "Navigation", href: "/dashboard/navigation" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-[#030712]/80 backdrop-blur-2xl border-b border-white/5 py-3" : "bg-transparent py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-black tracking-tighter font-[family-name:var(--font-orbitron)] text-white">
              RETAIL<span className="gradient-text">NOVA</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-bold text-slate-300 uppercase">System Live</span>
            </div>
            <Link href="/login" className="text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:text-cyan-400 transition-colors">
              Login
            </Link>
            <Link href="/dashboard" className="btn-glow !py-2.5 !px-6 text-[11px] uppercase tracking-widest">
              Launch OS
            </Link>
          </div>

          <button className="lg:hidden p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#030712] border-b border-white/10 p-6 lg:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {NAV_LINKS.map((link) => (
                <Link key={link.label} href={link.href} className="text-sm font-bold uppercase tracking-widest text-white" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                <Link href="/login" className="btn-neon w-full">Login</Link>
                <Link href="/dashboard" className="btn-glow w-full">Launch OS</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
