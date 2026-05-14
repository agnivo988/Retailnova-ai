"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, DollarSign, Users, ShoppingCart, Target } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { REVENUE_DATA, DEMAND_FORECAST } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

const WEEKLY = [
  { day: "Mon", revenue: 32400, customers: 890 },
  { day: "Tue", revenue: 28700, customers: 760 },
  { day: "Wed", revenue: 35200, customers: 940 },
  { day: "Thu", revenue: 31800, customers: 870 },
  { day: "Fri", revenue: 42600, customers: 1120 },
  { day: "Sat", revenue: 58400, customers: 1580 },
  { day: "Sun", revenue: 51200, customers: 1340 },
];

const CATEGORY_SHARE = [
  { name: "Produce", value: 22, color: "#10b981" },
  { name: "Dairy", value: 18, color: "#3b82f6" },
  { name: "Bakery", value: 12, color: "#f59e0b" },
  { name: "Beverages", value: 20, color: "#06b6d4" },
  { name: "Snacks", value: 15, color: "#ec4899" },
  { name: "Other", value: 13, color: "#8b5cf6" },
];

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong p-3 shadow-xl text-xs">
      <p className="text-slate-400 mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-white font-medium">{p.name}: {typeof p.value === "number" && p.value > 1000 ? formatCurrency(p.value) : p.value}</p>
      ))}
    </div>
  );
};

export default function AnalyticsPage() {
  const [weekly, setWeekly] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [demandForecast, setDemandForecast] = useState(DEMAND_FORECAST);

  useEffect(() => {
    import('@/lib/api').then(({ default: api }) => {
      api.get('/analytics')
        .then(res => {
          const data = res.data;
          const formatted = (data.data || []).map((d: any) => ({
            day: new Date(d.timestamp).toLocaleDateString('en-US', { weekday: 'short' }),
            revenue: d.value,
            customers: Math.floor(d.value / 40)
          }));
          if (formatted.length > 0) setWeekly(formatted);
          else setWeekly(WEEKLY); // Use fallback if DB empty
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch analytics", err);
          setWeekly(WEEKLY); // Fallback
          setLoading(false);
        });
      
      api.get('/ai')
        .then(res => {
          if (res.data?.data?.length > 0) {
            // Process AI demand forecast if exists
            // setDemandForecast(processedData);
          }
        }).catch(() => {});
    });
  }, []);

  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-emerald-400" /> Retail Analytics
        </h1>
        <p className="text-sm text-slate-500 mt-1">Revenue intelligence • Demand forecasting • KPIs</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: DollarSign, label: "Weekly Revenue", value: "$280K", change: "+14.2%", positive: true, color: "text-emerald-400 bg-emerald-500/10" },
          { icon: Users, label: "Weekly Customers", value: "7,500", change: "+9.1%", positive: true, color: "text-cyan-400 bg-cyan-500/10" },
          { icon: ShoppingCart, label: "Avg Basket Size", value: "$42.30", change: "+3.8%", positive: true, color: "text-purple-400 bg-purple-500/10" },
          { icon: Target, label: "Conversion Rate", value: "68.4%", change: "-1.2%", positive: false, color: "text-pink-400 bg-pink-500/10" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="stat-card">
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-xl ${s.color}`}><s.icon className="w-4 h-4" /></div>
              <span className={`text-xs font-semibold ${s.positive ? "text-emerald-400" : "text-red-400"}`}>{s.change}</span>
            </div>
            <div className="stat-value text-white">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Weekly Revenue */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-2 chart-container">
          <h3 className="text-sm font-semibold text-white mb-4">Weekly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={weekly}>
              <defs>
                <linearGradient id="wRevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#wRevGrad)" name="Revenue" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Pie */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="chart-container">
          <h3 className="text-sm font-semibold text-white mb-4">Revenue by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={CATEGORY_SHARE} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                {CATEGORY_SHARE.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {CATEGORY_SHARE.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                <span className="text-[11px] text-slate-400">{c.name} ({c.value}%)</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Demand Forecast Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-purple-400" /> AI Demand Forecast
        </h3>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Predicted Demand</th>
                <th>AI Confidence</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {demandForecast.map((d) => (
                <tr key={d.category}>
                  <td className="font-medium text-white">{d.category}</td>
                  <td>{d.current} units</td>
                  <td className={d.predicted > d.current ? "text-red-400" : "text-emerald-400"}>
                    {d.predicted} units {d.predicted > d.current ? "↑" : "↓"}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${d.confidence}%` }} />
                      </div>
                      <span className="text-xs text-cyan-400">{d.confidence}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      d.predicted > d.current ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"
                    }`}>
                      {d.predicted > d.current ? "Restock Soon" : "Adequate"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
