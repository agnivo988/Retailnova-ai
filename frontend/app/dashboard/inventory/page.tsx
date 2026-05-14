"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Boxes, Package, AlertTriangle, TrendingUp, Search, Filter, ArrowUpDown } from "lucide-react";

export default function InventoryPage() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('@/lib/api').then(({ default: api }) => {
      api.get('/inventory')
        .then(res => {
          setInventory(res.data.data || []);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch inventory", err);
          setLoading(false);
        });
    });
  }, []);

  const criticalCount = inventory.filter((i) => i.status === "critical").length;
  const lowCount = inventory.filter((i) => i.status === "low").length;
  const totalValue = inventory.reduce((a, i) => a + (i.stock * i.price), 0);

  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-white flex items-center gap-2">
          <Boxes className="w-6 h-6 text-cyan-400" /> Inventory Intelligence
        </h1>
        <p className="text-sm text-slate-500 mt-1">Stock health • AI predictions • Smart restocking</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Package, label: "Total SKUs", value: inventory.length.toString(), color: "text-cyan-400 bg-cyan-500/10" },
          { icon: AlertTriangle, label: "Critical Stock", value: criticalCount.toString(), color: "text-red-400 bg-red-500/10" },
          { icon: TrendingUp, label: "Low Stock Items", value: lowCount.toString(), color: "text-amber-400 bg-amber-500/10" },
          { icon: Boxes, label: "Total Value", value: `$${totalValue.toFixed(0)}`, color: "text-emerald-400 bg-emerald-500/10" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="stat-card">
            <div className={`p-2 rounded-xl w-fit mb-3 ${s.color}`}><s.icon className="w-4 h-4" /></div>
            <div className="stat-value text-white">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Inventory Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h3 className="text-sm font-semibold text-white">Product Inventory</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input placeholder="Search products..." className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/30 w-48" />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Product</th>
                <th>Category</th>
                <th>Stock Level</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, i) => (
                <motion.tr key={item.sku} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <td className="font-mono text-xs text-slate-500">{item.sku}</td>
                  <td className="font-medium text-white">{item.name}</td>
                  <td className="text-slate-400">{item.category}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.status === "critical" ? "bg-red-400" : item.status === "low" ? "bg-amber-400" : "bg-emerald-400"
                          }`}
                          style={{ width: `${(item.stock / item.capacity) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400">{item.stock}/{item.capacity}</span>
                    </div>
                  </td>
                  <td className="font-mono">${item.price}</td>
                  <td>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      item.status === "critical" ? "bg-red-500/20 text-red-400" :
                      item.status === "low" ? "bg-amber-500/20 text-amber-400" :
                      "bg-emerald-500/20 text-emerald-400"
                    }`}>{item.status}</span>
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
