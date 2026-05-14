"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  AlertTriangle, TrendingUp, Users, Activity,
  Thermometer, Eye, ShoppingCart, Zap,
} from "lucide-react";

const LIVE_ALERTS = [
  { icon: AlertTriangle, text: "Shelf A7-B empty — Dairy section", severity: "critical", time: "2m ago" },
  { icon: TrendingUp, text: "Beverage demand ↑ 34% predicted", severity: "info", time: "5m ago" },
  { icon: Users, text: "Checkout congestion at 85%", severity: "warning", time: "8m ago" },
  { icon: Eye, text: "Camera C3 restored — Zone active", severity: "success", time: "12m ago" },
  { icon: ShoppingCart, text: "Peak hour approaching — staff alert", severity: "warning", time: "15m ago" },
  { icon: Zap, text: "AI restocking task assigned to Staff #12", severity: "info", time: "18m ago" },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 40;
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(interval);
      } else {
        setValue(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [inView, target]);

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
}

export default function LivePreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeAlert, setActiveAlert] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAlert((p) => (p + 1) % LIVE_ALERTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-purple-400/70 mb-4 block">
            Live Intelligence
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-4">
            <span className="text-white">Real-Time </span>
            <span className="gradient-text">Store Operations</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Live Alerts Feed */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="live-dot" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Live Alerts</h3>
            </div>
            <div className="space-y-3">
              {LIVE_ALERTS.map((alert, i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: i === activeAlert ? 1 : 0.4,
                    scale: i === activeAlert ? 1 : 0.98,
                  }}
                  className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                    i === activeAlert ? "bg-white/5 border border-cyan-500/10" : ""
                  }`}
                >
                  <alert.icon className={`w-4 h-4 mt-0.5 shrink-0 ${
                    alert.severity === "critical" ? "text-red-400" :
                    alert.severity === "warning" ? "text-amber-400" :
                    alert.severity === "success" ? "text-emerald-400" : "text-cyan-400"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-300 truncate">{alert.text}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{alert.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Store Metrics
            </h3>
            <div className="space-y-5">
              {[
                { label: "Shelf Occupancy", value: 78, color: "bg-cyan-400" },
                { label: "Staff Efficiency", value: 92, color: "bg-emerald-400" },
                { label: "Customer Satisfaction", value: 88, color: "bg-purple-400" },
                { label: "AI Accuracy", value: 96, color: "bg-pink-400" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-400">{m.label}</span>
                    <span className="text-white font-semibold">{m.value}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${m.value}%` } : {}}
                      transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${m.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Key Numbers */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Today&apos;s Performance
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Revenue", value: 48200, prefix: "$", icon: TrendingUp, color: "text-emerald-400" },
                { label: "Customers", value: 1842, icon: Users, color: "text-cyan-400" },
                { label: "AI Tasks", value: 347, icon: Zap, color: "text-purple-400" },
                { label: "Uptime", value: 99, suffix: "%", icon: Activity, color: "text-pink-400" },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <s.icon className={`w-4 h-4 ${s.color} mb-2`} />
                  <div className="text-xl font-bold text-white font-[family-name:var(--font-outfit)]">
                    {s.prefix}<AnimatedCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
