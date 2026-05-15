import { io as Client } from 'socket.io-client';

const socket = Client('http://localhost:5000');

socket.on('connect', () => {
  console.log('✅ Connected to Socket.IO server');
});

socket.on('welcome', (msg) => {
  console.log('📬 Message from server:', msg);
});

socket.on('inventory_update', (data) => {
  console.log('📦 Inventory update received:', data);
});

setTimeout(() => {
  console.log('Closing test...');
  socket.close();
}, 5000);
