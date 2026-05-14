import { create } from "zustand";

/* ============ Types ============ */
export type UserRole = "admin" | "manager" | "staff" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Alert {
  id: string;
  type: "shelf" | "inventory" | "congestion" | "system" | "ai";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  aisle?: string;
}

export interface ShelfStatus {
  id: string;
  aisle: string;
  section: string;
  occupancy: number;
  healthScore: number;
  lastChecked: Date;
  status: "optimal" | "low" | "critical" | "empty";
  products: string[];
}

export interface CongestionZone {
  id: string;
  zone: string;
  density: number;
  prediction: number;
  trend: "increasing" | "stable" | "decreasing";
}

/* ============ App Store ============ */
interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  sidebarOpen: boolean;
  alerts: Alert[];
  unreadAlerts: number;
  currentView: string;
  theme: "dark" | "light";

  // Actions
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setCurrentView: (view: string) => void;
  addAlert: (alert: Alert) => void;
  markAlertRead: (id: string) => void;
  markAllAlertsRead: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  sidebarOpen: true,
  alerts: generateInitialAlerts(),
  unreadAlerts: 5,
  currentView: "dashboard",
  theme: "dark",

  setUser: (user) => set({ user }),
  login: (user) => {
    localStorage.setItem("token", "demo-token");
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, isAuthenticated: false });
  },
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCurrentView: (view) => set({ currentView: view }),
  addAlert: (alert) =>
    set((s) => ({
      alerts: [alert, ...s.alerts],
      unreadAlerts: s.unreadAlerts + 1,
    })),
  markAlertRead: (id) =>
    set((s) => ({
      alerts: s.alerts.map((a) => (a.id === id ? { ...a, read: true } : a)),
      unreadAlerts: Math.max(0, s.unreadAlerts - 1),
    })),
  markAllAlertsRead: () =>
    set((s) => ({
      alerts: s.alerts.map((a) => ({ ...a, read: true })),
      unreadAlerts: 0,
    })),
}));

/* ============ Mock Data Generators ============ */
function generateInitialAlerts(): Alert[] {
  return [
    {
      id: "a1",
      type: "shelf",
      severity: "critical",
      title: "Empty Shelf Detected",
      message: "Aisle 7, Section B — Dairy products shelf completely empty",
      timestamp: new Date(Date.now() - 120000),
      read: false,
      aisle: "A7-B",
    },
    {
      id: "a2",
      type: "inventory",
      severity: "high",
      title: "Low Stock Alert",
      message: "Organic Milk (SKU-4821) — Only 3 units remaining",
      timestamp: new Date(Date.now() - 300000),
      read: false,
    },
    {
      id: "a3",
      type: "congestion",
      severity: "medium",
      title: "High Congestion Zone",
      message: "Checkout area experiencing 85% capacity",
      timestamp: new Date(Date.now() - 600000),
      read: false,
    },
    {
      id: "a4",
      type: "ai",
      severity: "low",
      title: "AI Recommendation",
      message: "Predicted demand surge for beverages — weekend forecast",
      timestamp: new Date(Date.now() - 900000),
      read: false,
    },
    {
      id: "a5",
      type: "system",
      severity: "medium",
      title: "Camera Feed Restored",
      message: "Zone C-3 camera feed reconnected after 2min outage",
      timestamp: new Date(Date.now() - 1200000),
      read: false,
    },
  ];
}

/* ============ Simulation Data ============ */
export const MOCK_SHELVES: ShelfStatus[] = [
  { id: "s1", aisle: "A1", section: "Produce", occupancy: 92, healthScore: 95, lastChecked: new Date(), status: "optimal", products: ["Apples", "Bananas", "Oranges"] },
  { id: "s2", aisle: "A2", section: "Dairy", occupancy: 34, healthScore: 38, lastChecked: new Date(), status: "low", products: ["Milk", "Yogurt", "Cheese"] },
  { id: "s3", aisle: "A3", section: "Bakery", occupancy: 78, healthScore: 82, lastChecked: new Date(), status: "optimal", products: ["Bread", "Croissants", "Muffins"] },
  { id: "s4", aisle: "A4", section: "Beverages", occupancy: 12, healthScore: 15, lastChecked: new Date(), status: "critical", products: ["Water", "Juice", "Soda"] },
  { id: "s5", aisle: "A5", section: "Snacks", occupancy: 65, healthScore: 70, lastChecked: new Date(), status: "optimal", products: ["Chips", "Cookies", "Nuts"] },
  { id: "s6", aisle: "A6", section: "Frozen", occupancy: 88, healthScore: 91, lastChecked: new Date(), status: "optimal", products: ["Ice Cream", "Pizza", "Vegetables"] },
  { id: "s7", aisle: "A7", section: "Personal Care", occupancy: 5, healthScore: 8, lastChecked: new Date(), status: "empty", products: ["Shampoo", "Soap", "Toothpaste"] },
  { id: "s8", aisle: "A8", section: "Cleaning", occupancy: 71, healthScore: 75, lastChecked: new Date(), status: "optimal", products: ["Detergent", "Bleach", "Sponges"] },
];

export const MOCK_CONGESTION: CongestionZone[] = [
  { id: "z1", zone: "Entrance", density: 45, prediction: 55, trend: "increasing" },
  { id: "z2", zone: "Produce", density: 62, prediction: 58, trend: "decreasing" },
  { id: "z3", zone: "Checkout", density: 85, prediction: 90, trend: "increasing" },
  { id: "z4", zone: "Electronics", density: 30, prediction: 35, trend: "stable" },
  { id: "z5", zone: "Bakery", density: 50, prediction: 45, trend: "decreasing" },
  { id: "z6", zone: "Frozen Foods", density: 25, prediction: 30, trend: "increasing" },
];

export const REVENUE_DATA = [
  { time: "06:00", revenue: 2400, customers: 45, transactions: 38 },
  { time: "08:00", revenue: 5800, customers: 120, transactions: 95 },
  { time: "10:00", revenue: 12500, customers: 280, transactions: 210 },
  { time: "12:00", revenue: 18200, customers: 410, transactions: 350 },
  { time: "14:00", revenue: 15600, customers: 360, transactions: 290 },
  { time: "16:00", revenue: 19800, customers: 450, transactions: 380 },
  { time: "18:00", revenue: 22400, customers: 520, transactions: 440 },
  { time: "20:00", revenue: 16800, customers: 380, transactions: 310 },
  { time: "22:00", revenue: 8400, customers: 180, transactions: 150 },
];

export const DEMAND_FORECAST = [
  { category: "Produce", current: 850, predicted: 920, confidence: 94 },
  { category: "Dairy", current: 620, predicted: 580, confidence: 88 },
  { category: "Bakery", current: 430, predicted: 510, confidence: 91 },
  { category: "Beverages", current: 780, predicted: 950, confidence: 96 },
  { category: "Snacks", current: 390, predicted: 420, confidence: 87 },
  { category: "Frozen", current: 290, predicted: 310, confidence: 82 },
];
