"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Zap, Mail, Lock, Eye, EyeOff, ArrowRight,
  User, Shield, Fingerprint, Globe,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

const DEMO_USERS = [
  { role: "admin", name: "Alex Nova", email: "admin@retailnova.ai" },
  { role: "manager", name: "Sarah Chen", email: "manager@retailnova.ai" },
  { role: "staff", name: "James Park", email: "staff@retailnova.ai" },
  { role: "customer", name: "Maya Singh", email: "customer@retailnova.ai" },
] as const;

export default function LoginPage() {
  const router = useRouter();
  const login = useAppStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState<"login" | "signup">("login");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const match = DEMO_USERS.find((u) => u.email === email) || DEMO_USERS[0];
    login({ id: "1", name: match.name, email: match.email, role: match.role });
    router.push("/dashboard");
  };

  const quickLogin = async (role: string) => {
    const user = DEMO_USERS.find((u) => u.role === role)!;
    setEmail(user.email);
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    login({ id: "1", name: user.name, email: user.email, role: user.role });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <Zap className="w-5 h-5 text-black" />
          </div>
          <div>
            <span className="text-xl font-bold font-[family-name:var(--font-outfit)]">
              <span className="text-white">Retail</span>
              <span className="gradient-text">Nova</span>
            </span>
          </div>
        </Link>

        {/* Card */}
        <div className="glass-strong p-8 shadow-2xl shadow-black/40">
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-white/5 rounded-xl mb-6">
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  tab === t
                    ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/20"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {t === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {tab === "signup" && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-colors"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-colors"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-colors"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {tab === "login" && (
              <div className="flex justify-end">
                <a href="#" className="text-xs text-cyan-400/70 hover:text-cyan-400">Forgot password?</a>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-glow flex items-center justify-center gap-2 text-sm !py-3 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  {tab === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-xs text-slate-500">or continue with</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* Social + Biometric */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-slate-300 hover:border-cyan-500/20 hover:bg-white/10 transition-colors">
              <Globe className="w-4 h-4" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-slate-300 hover:border-cyan-500/20 hover:bg-white/10 transition-colors">
              <Fingerprint className="w-4 h-4" /> Biometric
            </button>
          </div>

          {/* Quick Demo Access */}
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 text-center">Quick Demo Access</p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_USERS.map((u) => (
                <button
                  key={u.role}
                  onClick={() => quickLogin(u.role)}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-xs text-slate-400 hover:text-cyan-400 hover:border-cyan-500/20 hover:bg-cyan-500/5 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span className="capitalize">{u.role}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
