"use client";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, Gift, User, TrendingUp } from "lucide-react";

const CUSTOMERS = [
  { id: 1, name: "Maya Singh", visits: 34, spent: 2840, loyalty: "Platinum", satisfaction: 96 },
  { id: 2, name: "James Park", visits: 22, spent: 1650, loyalty: "Gold", satisfaction: 88 },
  { id: 3, name: "Sarah Chen", visits: 18, spent: 1320, loyalty: "Gold", satisfaction: 92 },
  { id: 4, name: "Alex Johnson", visits: 45, spent: 3920, loyalty: "Platinum", satisfaction: 94 },
  { id: 5, name: "Priya Patel", visits: 12, spent: 890, loyalty: "Silver", satisfaction: 85 },
  { id: 6, name: "Carlos Rivera", visits: 8, spent: 540, loyalty: "Bronze", satisfaction: 78 },
];

export default function CustomersPage() {
  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-white flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-purple-400" /> Customer Experience Hub
        </h1>
        <p className="text-sm text-slate-500 mt-1">Loyalty analytics • Personalized recommendations • Shopping intelligence</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: User, label: "Active Customers", value: "1,842", color: "text-cyan-400 bg-cyan-500/10" },
          { icon: Heart, label: "Satisfaction", value: "92%", color: "text-pink-400 bg-pink-500/10" },
          { icon: Star, label: "Loyalty Members", value: "847", color: "text-amber-400 bg-amber-500/10" },
          { icon: Gift, label: "Rewards Given", value: "324", color: "text-purple-400 bg-purple-500/10" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="stat-card">
            <div className={`p-2 rounded-xl w-fit mb-3 ${s.color}`}><s.icon className="w-4 h-4" /></div>
            <div className="stat-value text-white">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Top Customers</h3>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Customer</th><th>Visits</th><th>Total Spent</th><th>Loyalty Tier</th><th>Satisfaction</th></tr></thead>
            <tbody>
              {CUSTOMERS.map((c, i) => (
                <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                  <td className="font-medium text-white">{c.name}</td>
                  <td>{c.visits}</td>
                  <td className="font-mono">${c.spent}</td>
                  <td><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    c.loyalty === "Platinum" ? "bg-cyan-500/20 text-cyan-400" :
                    c.loyalty === "Gold" ? "bg-amber-500/20 text-amber-400" :
                    c.loyalty === "Silver" ? "bg-slate-500/20 text-slate-400" :
                    "bg-orange-500/20 text-orange-400"
                  }`}>{c.loyalty}</span></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${c.satisfaction}%` }} />
                      </div>
                      <span className="text-xs text-emerald-400">{c.satisfaction}%</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
