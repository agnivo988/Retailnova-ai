"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Zap,
  LayoutDashboard,
  Eye,
  Navigation,
  Mic,
  BarChart3,
  Users,
  ShoppingCart,
  Settings,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Boxes,
  Shield,
  AlertTriangle,
  Thermometer,
  Map,
  UserCircle,
  Menu,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { getRelativeTime, getSeverityColor } from "@/lib/utils";

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Eye, label: "Computer Vision", href: "/dashboard/vision" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Users, label: "Crowd Monitor", href: "/dashboard/crowd" },
  { icon: Navigation, label: "Navigation", href: "/dashboard/navigation" },
  { icon: Mic, label: "Voice Assistant", href: "/dashboard/assistant" },
  { icon: Boxes, label: "Inventory", href: "/dashboard/inventory" },
  { icon: ShoppingCart, label: "Customer Hub", href: "/dashboard/customers" },
  { icon: AlertTriangle, label: "Restocking", href: "/dashboard/restocking" },
  { icon: Shield, label: "Security", href: "/dashboard/security" },
  {
    icon: Thermometer,
    label: "Sustainability",
    href: "/dashboard/sustainability",
  },
  { icon: Map, label: "Digital Twin", href: "/dashboard/twin" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    sidebarOpen,
    toggleSidebar,
    alerts,
    unreadAlerts,
    markAllAlertsRead,
    addAlert,
    user,
  } = useAppStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  // Auth guard: redirect to login if not authenticated
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login");
      }
    }
  }, [router]);

  useEffect(() => {
    setMobileSidebar(false);
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#030712] font-[family-name:var(--font-space)]">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 250 : 90 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:flex flex-col border-r border-white/5 bg-[#030712]/80 backdrop-blur-3xl relative z-30 shrink-0"
      >
        {/* Logo */}
        <div className="h-24 flex items-center px-8 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
              <Zap className="w-6 h-6 text-black" />
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-black text-lg font-[family-name:var(--font-orbitron)] tracking-tighter whitespace-nowrap overflow-hidden"
                >
                  <span className="text-white">RETAIL</span>
                  <span className="gradient-text">NOVA</span>
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto p-20 space-y-20 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all relative group ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "text-slate-500 hover:text-white hover:bg-white/5"
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <item.icon
                  className={`w-5 h-5 shrink-0 ${isActive ? "text-cyan-400" : "group-hover:text-cyan-400 transition-colors"}`}
                />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 w-1 h-1/2 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Area */}
        <div className="p-6 border-t border-white/5 bg-white/[0.02]">
          <div
            className={`flex items-center gap-3 p-2 rounded-2xl ${sidebarOpen ? "bg-white/5" : ""}`}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center shrink-0 border border-white/10">
              <UserCircle className="w-5 h-5 text-cyan-400" />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-black text-white truncate uppercase tracking-tighter">
                  {user?.name || "Nova Core"}
                </div>
                <div className="text-[9px] text-cyan-400/60 uppercase font-bold tracking-widest">
                  {user?.role || "Administrator"}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-6 border-b border-white/5 bg-[#030712]/60 backdrop-blur-2xl shrink-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all hover:border-cyan-500/30"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
            <h1 className="text-sm font-black text-white uppercase tracking-[0.2em] font-[family-name:var(--font-orbitron)] hidden sm:block">
              {SIDEBAR_ITEMS.find((i) => i.href === pathname)?.label ||
                "RetailNova OS"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Data Badge */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                Global Stream: Active
              </span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all relative group"
              >
                <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                {unreadAlerts > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-cyan-400 to-purple-500 text-black text-[10px] font-black rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    {unreadAlerts}
                  </span>
                )}
              </button>
            </div>

            <button
  className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-red-400 transition-all"
  onClick={() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }}
>
  <LogOut className="w-5 h-5" />
</button>
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
