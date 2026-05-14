import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n);
}

export function getRelativeTime(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "optimal": return "text-emerald-400";
    case "low": return "text-amber-400";
    case "critical": return "text-red-400";
    case "empty": return "text-red-500";
    default: return "text-slate-400";
  }
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case "low": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "medium": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "critical": return "bg-red-500/20 text-red-400 border-red-500/30";
    default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/* Simulated real-time data fluctuation */
export function fluctuate(base: number, range: number): number {
  return Math.round(base + (Math.random() - 0.5) * range * 2);
}
