import { io } from '../app';

export const emitNotification = (data: any) => {
  io.emit('notification', data);
};

export const emitInventoryAlert = (data: any) => {
  io.emit('inventory_alert', data);
};

export const emitCongestionAlert = (data: any) => {
  io.emit('congestion_alert', data);
};

export const emitAiUpdate = (data: any) => {
  io.emit('ai_update', data);
};

export const emitToStore = (storeId: string, event: string, data: any) => {
  io.to(`store_${storeId}`).emit(event, data);
};
