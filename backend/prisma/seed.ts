import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');
  
  // Create Store
  const store = await prisma.store.create({
    data: {
      name: 'RetailNova Flagship Store',
      location: 'New York, NY',
    },
  });

  // Create Roles
  const adminRole = await prisma.role.create({
    data: { name: 'Admin', permissions: ['all'] },
  });
  
  const staffRole = await prisma.role.create({
    data: { name: 'Staff', permissions: ['view_inventory', 'update_tasks'] },
  });

  // Create Users
  const hashedAdminPassword = await bcrypt.hash('password', 10);
  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@retailnova.ai',
      password: hashedAdminPassword,
      roleId: adminRole.id,
      storeId: store.id,
    },
  });

  // Create Categories
  const dairyCategory = await prisma.category.create({ data: { name: 'Dairy' } });
  const produceCategory = await prisma.category.create({ data: { name: 'Produce' } });

  // Create Products
  const milk = await prisma.product.create({
    data: {
      sku: 'SKU-1001',
      name: 'Organic Whole Milk',
      price: 4.99,
      categoryId: dairyCategory.id,
    },
  });
  
  const avocado = await prisma.product.create({
    data: {
      sku: 'SKU-1003',
      name: 'Fresh Avocados',
      price: 1.99,
      categoryId: produceCategory.id,
    },
  });

  // Create Shelves
  const shelfA1 = await prisma.shelf.create({
    data: { storeId: store.id, zone: 'A1 - Dairy', capacity: 50 },
  });
  const shelfB2 = await prisma.shelf.create({
    data: { storeId: store.id, zone: 'B2 - Produce', capacity: 40 },
  });

  // Create Inventory
  await prisma.inventory.create({
    data: {
      storeId: store.id,
      productId: milk.id,
      shelfId: shelfA1.id,
      stock: 12,
      status: 'critical',
    },
  });
  
  await prisma.inventory.create({
    data: {
      storeId: store.id,
      productId: avocado.id,
      shelfId: shelfB2.id,
      stock: 8,
      status: 'low',
    },
  });

  // Analytics Sample
  for (let i = 0; i < 24; i++) {
    await prisma.analytics.create({
      data: {
        storeId: store.id,
        metric: 'revenue',
        value: Math.floor(Math.random() * 5000) + 1000,
        timestamp: new Date(Date.now() - i * 3600000), 
      },
    });
    
    await prisma.crowdAnalytics.create({
      data: {
        storeId: store.id,
        zone: 'Checkout',
        density: Math.floor(Math.random() * 60) + 20,
        timestamp: new Date(Date.now() - i * 3600000),
      }
    });
  }

  // Create a few notifications
  await prisma.notification.createMany({
    data: [
      { title: 'Low Stock', message: 'Milk is running low in Aisle 4', type: 'inventory', isRead: false },
      { title: 'Crowd Alert', message: 'High density detected at Checkout', type: 'crowd', isRead: false },
    ]
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
