export const INVENTORY = [
  { sku: "SKU-1001", name: "Organic Whole Milk", category: "Dairy", stock: 12, capacity: 50, price: 4.99, status: "critical" },
  { sku: "SKU-1002", name: "Sourdough Bread Loaf", category: "Bakery", stock: 45, capacity: 60, price: 5.49, status: "normal" },
  { sku: "SKU-1003", name: "Fresh Avocados (each)", category: "Produce", stock: 8, capacity: 40, price: 1.99, status: "low" },
  { sku: "SKU-1004", name: "Sparkling Water 12pk", category: "Beverages", stock: 3, capacity: 30, price: 6.99, status: "critical" },
  { sku: "SKU-1005", name: "Vanilla Ice Cream 1L", category: "Frozen", stock: 28, capacity: 35, price: 5.99, status: "normal" },
  { sku: "SKU-1006", name: "Organic Granola", category: "Snacks", stock: 15, capacity: 25, price: 7.49, status: "low" },
  { sku: "SKU-1007", name: "Greek Yogurt 500g", category: "Dairy", stock: 42, capacity: 50, price: 3.99, status: "normal" },
  { sku: "SKU-1008", name: "Almond Butter", category: "Snacks", stock: 5, capacity: 20, price: 8.99, status: "critical" },
  { sku: "SKU-1009", name: "Fresh Salmon Fillet", category: "Seafood", stock: 22, capacity: 30, price: 12.99, status: "normal" },
  { sku: "SKU-1010", name: "Organic Eggs (dozen)", category: "Dairy", stock: 18, capacity: 40, price: 6.49, status: "low" },
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
