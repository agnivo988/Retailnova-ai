"use client";
import { motion } from "framer-motion";
import { AlertTriangle, Zap, Clock, User, CheckCircle, ArrowRight } from "lucide-react";

const TASKS = [
  { id: 1, shelf: "A4 - Beverages", urgency: 95, items: ["Sparkling Water", "Orange Juice"], assignee: "Staff #5", eta: "8 min", status: "urgent" },
  { id: 2, shelf: "A7 - Personal Care", urgency: 88, items: ["Shampoo", "Body Wash"], assignee: "Staff #12", eta: "12 min", status: "urgent" },
  { id: 3, shelf: "A2 - Dairy", urgency: 72, items: ["Organic Milk", "Eggs"], assignee: "Staff #3", eta: "15 min", status: "pending" },
  { id: 4, shelf: "A5 - Snacks", urgency: 55, items: ["Granola", "Almond Butter"], assignee: "Unassigned", eta: "—", status: "pending" },
  { id: 5, shelf: "A1 - Produce", urgency: 30, items: ["Avocados"], assignee: "Staff #8", eta: "20 min", status: "in-progress" },
  { id: 6, shelf: "A3 - Bakery", urgency: 15, items: ["Croissants"], assignee: "Staff #8", eta: "25 min", status: "completed" },
];

export default function RestockingPage() {
  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-white flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-amber-400" /> AI Restocking Engine
        </h1>
        <p className="text-sm text-slate-500 mt-1">Urgency scoring • Smart task assignment • Predictive demand</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: AlertTriangle, label: "Urgent Tasks", value: "2", color: "text-red-400 bg-red-500/10" },
          { icon: Clock, label: "Pending", value: "2", color: "text-amber-400 bg-amber-500/10" },
          { icon: Zap, label: "In Progress", value: "1", color: "text-cyan-400 bg-cyan-500/10" },
          { icon: CheckCircle, label: "Completed Today", value: "14", color: "text-emerald-400 bg-emerald-500/10" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="stat-card">
            <div className={`p-2 rounded-xl w-fit mb-3 ${s.color}`}><s.icon className="w-4 h-4" /></div>
            <div className="stat-value text-white">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-3">
        {TASKS.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`glass-card p-5 flex flex-col sm:flex-row sm:items-center gap-4 ${
              task.status === "urgent" ? "border-red-500/20" : ""
            }`}
          >
            {/* Urgency Score */}
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl font-mono ${
                task.urgency > 80 ? "bg-red-500/15 text-red-400 border border-red-500/20" :
                task.urgency > 50 ? "bg-amber-500/15 text-amber-400 border border-amber-500/20" :
                task.urgency > 20 ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20" :
                "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
              }`}>
                {task.urgency}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{task.shelf}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{task.items.join(", ")}</p>
              </div>
            </div>

            <div className="flex-1" />

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-slate-400">
                <User className="w-3.5 h-3.5" /> {task.assignee}
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5" /> {task.eta}
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                task.status === "urgent" ? "bg-red-500/20 text-red-400" :
                task.status === "pending" ? "bg-amber-500/20 text-amber-400" :
                task.status === "in-progress" ? "bg-cyan-500/20 text-cyan-400" :
                "bg-emerald-500/20 text-emerald-400"
              }`}>{task.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
