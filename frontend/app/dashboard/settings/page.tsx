"use client";
import { motion } from "framer-motion";
import { Settings, User, Bell, Palette, Globe, Shield, Database } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-slate-400" /> Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">System configuration • User preferences</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        {[
          { icon: User, title: "Profile Settings", desc: "Update your name, email, and avatar", items: ["Display Name", "Email Address", "Role", "Avatar"] },
          { icon: Bell, title: "Notifications", desc: "Configure alert preferences", items: ["Push Notifications", "Email Alerts", "Shelf Alerts", "AI Insights"] },
          { icon: Palette, title: "Appearance", desc: "Customize the dashboard look", items: ["Dark Mode", "Accent Color", "Font Size", "Compact Mode"] },
          { icon: Globe, title: "Language & Region", desc: "Set your preferred language", items: ["Language", "Timezone", "Date Format", "Currency"] },
          { icon: Shield, title: "Security", desc: "Manage authentication settings", items: ["Two-Factor Auth", "Session Timeout", "API Keys", "Audit Log"] },
          { icon: Database, title: "Data & Storage", desc: "Manage data retention policies", items: ["Data Retention", "Export Data", "Cache Settings", "Backup"] },
        ].map((section, i) => (
          <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-white/5"><section.icon className="w-4 h-4 text-cyan-400" /></div>
              <div>
                <h3 className="text-sm font-semibold text-white">{section.title}</h3>
                <p className="text-xs text-slate-500">{section.desc}</p>
              </div>
            </div>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-sm text-slate-300">{item}</span>
                  <div className="w-10 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/30 relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-cyan-400 shadow shadow-cyan-400/50" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
