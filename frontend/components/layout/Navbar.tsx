"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Menu,
  X,
  Zap,
  ChevronDown,
  Bell,
  User,
  LogIn,
  BarChart3,
  ShieldCheck,
  Eye,
  Navigation,
  Mic,
  Bot,
} from "lucide-react";

const NAV_LINKS = [
  {
    label: "Platform",
    children: [
      { label: "AI Dashboard", href: "/dashboard", icon: BarChart3, desc: "Real-time retail intelligence" },
      { label: "Computer Vision", href: "/dashboard/vision", icon: Eye, desc: "AI shelf monitoring" },
      { label: "Navigation", href: "/dashboard/navigation", icon: Navigation, desc: "Smart indoor routing" },
      { label: "Voice Assistant", href: "/dashboard/assistant", icon: Mic, desc: "Multilingual AI assistant" },
    ],
  },
  {
    label: "Solutions",
    children: [
      { label: "For Retailers", href: "#retailers", icon: ShieldCheck, desc: "Enterprise solutions" },
      { label: "For Staff", href: "#staff", icon: Bot, desc: "Operational automation" },
    ],
  },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(null), 200);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#030712]/80 backdrop-blur-2xl border-b border-cyan-500/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight font-[family-name:var(--font-outfit)]">
                <span className="text-white">Retail</span>
                <span className="gradient-text">Nova</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-cyan-400/60 -mt-0.5">
                AI Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(link.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                    {link.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        dropdownOpen === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-72 p-2 glass-strong shadow-2xl shadow-black/40"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-cyan-500/5 transition-colors group/item"
                          >
                            <div className="mt-0.5 p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover/item:bg-cyan-500/20 transition-colors">
                              <child.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">
                                {child.label}
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                {child.desc}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href!}
                  className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors relative">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full" />
            </button>
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="btn-glow text-xs !py-2.5 !px-5"
            >
              Launch Dashboard
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-cyan-500/10 bg-[#030712]/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div key={link.label} className="space-y-1">
                    <div className="text-xs uppercase tracking-wider text-cyan-400/60 px-3 py-2">
                      {link.label}
                    </div>
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5"
                        onClick={() => setMobileOpen(false)}
                      >
                        <child.icon className="w-4 h-4 text-cyan-400" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href!}
                    className="block px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-4 flex flex-col gap-2 border-t border-white/5">
                <Link href="/login" className="btn-neon text-center text-sm">
                  Sign In
                </Link>
                <Link href="/dashboard" className="btn-glow text-center text-sm">
                  Launch Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
