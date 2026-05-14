import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_WS_URL || process.env.SOCKET_URL || 'http://localhost:5000', {
      transports: ['websocket'],
      autoConnect: true,
    });
  }
  return socket;
};
