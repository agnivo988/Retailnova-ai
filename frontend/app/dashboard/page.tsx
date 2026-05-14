"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, TrendingDown, DollarSign, Users, Eye,
  ShoppingCart, AlertTriangle, Zap, Activity,
  ArrowUpRight, Brain, BarChart3, Package,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";
import { REVENUE_DATA, DEMAND_FORECAST, MOCK_SHELVES, MOCK_CONGESTION } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

const fadeIn = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.08, duration: 0.4 },
});

const PIE_COLORS = ["#00e5ff", "#a855f7", "#22d3ee", "#ec4899", "#10b981", "#f59e0b"];

/* ============ Animated Stat Card ============ */
function StatCard({ icon: Icon, label, value, change, positive, color, index }: {
  icon: React.ElementType; label: string; value: string; change: string;
  positive: boolean; color: string; index: number;
}) {
  return (
    <motion.div {...fadeIn(index)} className="stat-card holographic group">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold ${positive ? "text-emerald-400" : "text-red-400"}`}>
          {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <div className="stat-value gradient-text">{value}</div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
}

/* ============ Custom Tooltip ============ */
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong p-3 shadow-xl text-xs">
      <p className="text-slate-400 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-white font-medium">
          {p.name}: {p.name === "revenue" ? formatCurrency(p.value) : p.value}
        </p>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [liveRevenue, setLiveRevenue] = useState(48247);
  const [liveCustomers, setLiveCustomers] = useState(1842);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveRevenue((p) => p + Math.floor(Math.random() * 50));
      setLiveCustomers((p) => p + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const shelfStats = {
    optimal: MOCK_SHELVES.filter((s) => s.status === "optimal").length,
    low: MOCK_SHELVES.filter((s) => s.status === "low").length,
    critical: MOCK_SHELVES.filter((s) => s.status === "critical" || s.status === "empty").length,
  };

  return (
    <div className="page-enter space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-white">
            AI Command Center
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time retail intelligence • Last updated: <span className="text-cyan-400">just now</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="live-dot" />
          <span className="text-xs font-medium text-emerald-400">All Systems Operational</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Today's Revenue" value={formatCurrency(liveRevenue)} change="+12.5%" positive index={0} color="bg-emerald-500/10 text-emerald-400" />
        <StatCard icon={Users} label="Active Customers" value={liveCustomers.toLocaleString()} change="+8.2%" positive index={1} color="bg-cyan-500/10 text-cyan-400" />
        <StatCard icon={Eye} label="Shelves Monitored" value="2,847" change="-2 alerts" positive={false} index={2} color="bg-purple-500/10 text-purple-400" />
        <StatCard icon={Brain} label="AI Tasks Completed" value="347" change="+23%" positive index={3} color="bg-pink-500/10 text-pink-400" />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <motion.div {...fadeIn(4)} className="lg:col-span-2 chart-container">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              Revenue & Customer Flow
            </h3>
            <span className="text-xs text-slate-500">Today</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={REVENUE_DATA}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00e5ff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="custGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#00e5ff" strokeWidth={2} fill="url(#revGrad)" name="revenue" />
              <Area type="monotone" dataKey="customers" stroke="#a855f7" strokeWidth={2} fill="url(#custGrad)" name="customers" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Demand Forecast */}
        <motion.div {...fadeIn(5)} className="chart-container">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            Demand Forecast
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={DEMAND_FORECAST} layout="vertical">
              <XAxis type="number" tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="category" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="current" fill="#00e5ff" radius={[0, 4, 4, 0]} name="Current" barSize={12} />
              <Bar dataKey="predicted" fill="#a855f7" radius={[0, 4, 4, 0]} name="Predicted" barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Shelf Health */}
        <motion.div {...fadeIn(6)} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
            <Package className="w-4 h-4 text-cyan-400" />
            Shelf Health Overview
          </h3>
          <div className="space-y-3">
            {MOCK_SHELVES.slice(0, 6).map((shelf) => (
              <div key={shelf.id} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-20">{shelf.section}</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      shelf.occupancy > 70 ? "bg-emerald-400" :
                      shelf.occupancy > 30 ? "bg-amber-400" : "bg-red-400"
                    }`}
                    style={{ width: `${shelf.occupancy}%` }}
                  />
                </div>
                <span className={`text-xs font-mono font-semibold w-10 text-right ${
                  shelf.occupancy > 70 ? "text-emerald-400" :
                  shelf.occupancy > 30 ? "text-amber-400" : "text-red-400"
                }`}>
                  {shelf.occupancy}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Congestion Monitor */}
        <motion.div {...fadeIn(7)} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-pink-400" />
            Congestion Monitor
          </h3>
          <div className="space-y-3">
            {MOCK_CONGESTION.map((zone) => (
              <div key={zone.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div>
                  <span className="text-sm text-white font-medium">{zone.zone}</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className={`text-xs ${
                      zone.trend === "increasing" ? "text-red-400" :
                      zone.trend === "decreasing" ? "text-emerald-400" : "text-slate-400"
                    }`}>
                      {zone.trend === "increasing" ? "↑" : zone.trend === "decreasing" ? "↓" : "→"} {zone.trend}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold font-mono ${
                    zone.density > 70 ? "text-red-400" :
                    zone.density > 40 ? "text-amber-400" : "text-emerald-400"
                  }`}>
                    {zone.density}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div {...fadeIn(8)} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-amber-400" />
            AI Insights
          </h3>
          <div className="space-y-3">
            {[
              { text: "Move 2 staff to checkout — predicted rush at 18:00", priority: "high" },
              { text: "Restock Aisle 4 beverages — 34% demand increase expected", priority: "high" },
              { text: "Enable AC Zone C — temperature trending up 2°F", priority: "medium" },
              { text: "Weekend promotion: bundle snacks + beverages for +15% revenue", priority: "low" },
              { text: "Camera C7 needs maintenance — 3% accuracy drop detected", priority: "medium" },
            ].map((insight, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/10 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  insight.priority === "high" ? "bg-red-400" :
                  insight.priority === "medium" ? "bg-amber-400" : "bg-emerald-400"
                }`} />
                <p className="text-sm text-slate-300 leading-relaxed">{insight.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
