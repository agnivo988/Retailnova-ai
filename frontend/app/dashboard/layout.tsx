"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap, LayoutDashboard, Eye, Navigation, Mic, BarChart3,
  Users, ShoppingCart, Settings, Bell, Search, ChevronLeft,
  ChevronRight, LogOut, Boxes, Shield, AlertTriangle,
  Thermometer, Map, UserCircle, Menu,
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
  { icon: Thermometer, label: "Sustainability", href: "/dashboard/sustainability" },
  { icon: Map, label: "Digital Twin", href: "/dashboard/twin" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar, alerts, unreadAlerts, markAllAlertsRead, addAlert, user } = useAppStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  useEffect(() => {
    setMobileSidebar(false);
  }, [pathname]);

  useEffect(() => {
    // Setup socket listeners for global notifications
    const { getSocket } = require("@/lib/socket");
    const socket = getSocket();

    socket.on("notification", (data: any) => {
      addAlert({
        id: Math.random().toString(36).substr(2, 9),
        type: data.type || "system",
        severity: data.severity || "medium",
        title: data.title || "New Notification",
        message: data.message || "",
        timestamp: new Date(),
        read: false,
      });
    });

    socket.on("inventory_alert", (data: any) => {
      addAlert({
        id: Math.random().toString(36).substr(2, 9),
        type: "inventory",
        severity: "high",
        title: "Stock Alert",
        message: `${data.productName || "Product"} is running low!`,
        timestamp: new Date(),
        read: false,
      });
    });

    return () => {
      socket.off("notification");
      socket.off("inventory_alert");
    };
  }, [addAlert]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#030712]">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 256 : 72 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:flex flex-col border-r border-cyan-500/10 bg-[#030712]/90 backdrop-blur-xl relative z-30 shrink-0"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-bold text-sm font-[family-name:var(--font-outfit)] whitespace-nowrap overflow-hidden"
                >
                  <span className="text-white">Retail</span>
                  <span className="gradient-text">Nova</span>
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-item ${isActive ? "active" : ""}`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <item.icon className="w-[18px] h-[18px] shrink-0" />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Collapse Button */}
        <div className="p-3 border-t border-white/5">
          <button onClick={toggleSidebar} className="sidebar-item w-full justify-center">
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            {sidebarOpen && <span className="text-xs">Collapse</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileSidebar(false)}
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-[#030712] border-r border-cyan-500/10 z-50 flex flex-col lg:hidden"
            >
              <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-black" />
                  </div>
                  <span className="font-bold text-sm font-[family-name:var(--font-outfit)]">
                    <span className="text-white">Retail</span><span className="gradient-text">Nova</span>
                  </span>
                </Link>
              </div>
              <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                {SIDEBAR_ITEMS.map((item) => (
                  <Link key={item.href} href={item.href} className={`sidebar-item ${pathname === item.href ? "active" : ""}`}>
                    <item.icon className="w-[18px] h-[18px]" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-cyan-500/10 bg-[#030712]/80 backdrop-blur-xl shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 text-slate-400 hover:text-white" onClick={() => setMobileSidebar(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search products, aisles, analytics..."
                className="w-64 lg:w-80 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/30 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Live Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mr-2">
              <div className="live-dot" />
              <span className="text-xs font-medium text-emerald-400">System Live</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5" />
                {unreadAlerts > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 badge-neon text-[10px]">
                    {unreadAlerts}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-80 glass-strong shadow-2xl shadow-black/50 p-4 z-50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-white">Notifications</h4>
                      <button onClick={markAllAlertsRead} className="text-xs text-cyan-400 hover:text-cyan-300">Mark all read</button>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {alerts.slice(0, 5).map((alert) => (
                        <div key={alert.id} className={`p-3 rounded-xl ${alert.read ? "opacity-50" : "bg-white/5"}`}>
                          <div className="flex items-start gap-2">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase border ${getSeverityColor(alert.severity)}`}>
                              {alert.severity}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-white truncate">{alert.title}</p>
                              <p className="text-xs text-slate-500 mt-0.5">{getRelativeTime(alert.timestamp)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User */}
            <div className="flex items-center gap-2 pl-2 ml-1 border-l border-white/5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20 flex items-center justify-center">
                <UserCircle className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-medium text-white">{user?.name || "Guest"}</div>
                <div className="text-[10px] text-slate-500 capitalize">{user?.role || "viewer"}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
