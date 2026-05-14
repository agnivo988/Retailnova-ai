"use client";
import { motion } from "framer-motion";
import { Shield, Camera, AlertTriangle, Eye, Activity, Users, Lock, Bell } from "lucide-react";

const INCIDENTS = [
  { id: 1, type: "Unusual Movement", zone: "Electronics", risk: "High", time: "2 min ago", status: "Investigating" },
  { id: 2, type: "Loitering Detected", zone: "Checkout", risk: "Medium", time: "8 min ago", status: "Monitoring" },
  { id: 3, type: "Unauthorized Access", zone: "Storage Room", risk: "High", time: "15 min ago", status: "Resolved" },
  { id: 4, type: "Crowd Anomaly", zone: "Entrance", risk: "Low", time: "22 min ago", status: "Cleared" },
];

export default function SecurityPage() {
  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-white flex items-center gap-2">
          <Shield className="w-6 h-6 text-red-400" /> Security & Safety
        </h1>
        <p className="text-sm text-slate-500 mt-1">AI threat detection • Emergency management • Access control</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Camera, label: "Active Cameras", value: "24", color: "text-emerald-400 bg-emerald-500/10" },
          { icon: AlertTriangle, label: "Active Alerts", value: "2", color: "text-red-400 bg-red-500/10" },
          { icon: Lock, label: "Secure Zones", value: "12/12", color: "text-cyan-400 bg-cyan-500/10" },
          { icon: Activity, label: "Threat Level", value: "Low", color: "text-emerald-400 bg-emerald-500/10" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="stat-card">
            <div className={`p-2 rounded-xl w-fit mb-3 ${s.color}`}><s.icon className="w-4 h-4" /></div>
            <div className="stat-value text-white">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-red-400" /> Security Incidents</h3>
        <div className="space-y-3">
          {INCIDENTS.map((inc, i) => (
            <motion.div key={inc.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-red-500/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${inc.risk === "High" ? "bg-red-500/15 text-red-400" : inc.risk === "Medium" ? "bg-amber-500/15 text-amber-400" : "bg-emerald-500/15 text-emerald-400"}`}>
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">{inc.type}</h4>
                  <p className="text-xs text-slate-500">Zone: {inc.zone} • {inc.time}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                inc.status === "Investigating" ? "bg-red-500/20 text-red-400" :
                inc.status === "Monitoring" ? "bg-amber-500/20 text-amber-400" :
                "bg-emerald-500/20 text-emerald-400"
              }`}>{inc.status}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
