"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Zap, Clock, User, CheckCircle, ArrowRight } from "lucide-react";

export default function RestockingPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('@/lib/api').then(({ default: api }) => {
      api.get('/inventory')
        .then(res => {
          const inventory = res.data.data || [];
          const critical = inventory.filter((i: any) => i.status === 'critical' || i.status === 'low');
          const mappedTasks = critical.map((item: any, idx: number) => ({
            id: item.id,
            shelf: `${item.shelf?.zone || 'A' + (idx+1)} - ${item.category?.name || 'General'}`,
            urgency: item.status === 'critical' ? 95 : 70,
            items: [item.name],
            assignee: "Staff #" + (Math.floor(Math.random() * 10) + 1),
            eta: (Math.floor(Math.random() * 20) + 5) + " min",
            status: item.status === 'critical' ? 'urgent' : 'pending'
          }));
          setTasks(mappedTasks);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    });
  }, []);

  if (loading) return <div className="flex items-center justify-center h-full text-white">Generating AI Restock Tasks...</div>;

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
          { icon: AlertTriangle, label: "Urgent Tasks", value: tasks.filter(t => t.status === 'urgent').length.toString(), color: "text-red-400 bg-red-500/10" },
          { icon: Clock, label: "Pending", value: tasks.filter(t => t.status === 'pending').length.toString(), color: "text-amber-400 bg-amber-500/10" },
          { icon: Zap, label: "In Progress", value: tasks.filter(t => t.status === 'in-progress').length.toString(), color: "text-cyan-400 bg-cyan-500/10" },
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
        {tasks.map((task, i) => (
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
