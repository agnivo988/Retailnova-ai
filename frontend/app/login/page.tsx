"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Zap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
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

  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 1200));

    const match =
      DEMO_USERS.find((u) => u.email === email) ||
      DEMO_USERS[0];

    login({
      id: "1",
      name: match.name,
      email: match.email,
      role: match.role,
    });

    router.push("/dashboard");
  };

  const quickLogin = async (role: string) => {
    const user = DEMO_USERS.find((u) => u.role === role)!;

    setEmail(user.email);

    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 800));

    login({
      id: "1",
      name: user.name,
      email: user.email,
      role: user.role,
    });

    router.push("/dashboard");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] flex items-center justify-center px-4 py-10">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-3 mb-5"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 shadow-xl shadow-cyan-500/20">
              <Zap className="w-6 h-6 text-black" />
            </div>

            <span className="text-2xl font-black tracking-tight font-[family-name:var(--font-orbitron)] text-white">
              RETAIL
              <span className="gradient-text">NOVA</span>
            </span>
          </Link>

          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide font-[family-name:var(--font-orbitron)]">
            Access{" "}
            <span className="text-cyan-400">
              Intelligence
            </span>{" "}
            Portal
          </h1>

          <p className="mt-2 text-sm text-slate-500 font-[family-name:var(--font-space)]">
            Enterprise OS Authentication Protocol
          </p>
        </div>

        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#181f2a]/80 to-[#232946]/90 backdrop-blur-xl p-7 sm:p-10 shadow-2xl">
          {/* Top border glow */}
          <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-shimmer" />

          {/* Tabs */}
          <div className="grid grid-cols-2 gap-3 p-1 mb-8 rounded-2xl bg-white/5">
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-xl py-3 text-[11px] font-black uppercase tracking-widest transition-all ${
                  tab === t
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {t === "login"
                  ? "Authentication"
                  : "Registration"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={handleAuth}
            className="space-y-5"
          >
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />

              <input
                type="email"
                placeholder="IDENTITY@RETAILNOVA.AI"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full h-14 rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/10 transition-all font-mono"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />

              <input
                type={
                  showPassword ? "text" : "password"
                }
                placeholder="ENCRYPTED_PASSWORD"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full h-14 rounded-2xl border border-white/10 bg-white/5 pl-12 pr-12 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/10 transition-all font-mono"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-3 w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-cyan-500/20 hover:scale-[1.01] transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
              ) : (
                <>
                  {tab === "login" ? "INITIALIZE ACCESS" : "GENERATE IDENTITY"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Access */}
          <div className="mt-9">
            <div className="flex items-center gap-4 mb-5">
              <div className="flex-1 h-px bg-white/5" />

              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 whitespace-nowrap">
                Rapid Deployment
              </span>

              <div className="flex-1 h-px bg-white/5" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DEMO_USERS.map((u) => (
                <button
                  key={u.role}
                  onClick={() =>
                    quickLogin(u.role)
                  }
                  className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/[0.02] p-4 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all"
                >
                  <Shield className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />

                  <span className="text-[10px] font-black uppercase tracking-wide text-slate-500 group-hover:text-white transition-colors">
                    {u.role}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
