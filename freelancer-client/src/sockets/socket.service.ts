// l. 567
import { io, Socket } from 'socket.io-client';

export let socket: Socket;

// const VITE_BASE_ENDPOINT = 'http://localhost:4000'
class SocketService {
  setupSocketConnection() {
    // socket = io(VITE_BASE_ENDPOINT, {
    socket = io(import.meta.env.VITE_BASE_ENDPOINT, {
      transports: ['websocket'],
      secure: true
    });
    this.socketConnectionEvents();
  }

  socketConnectionEvents() {
    socket.on('connect', () => {
      console.log('SocketService Connected to server');
    });

    socket.on('disconnect', (reason: Socket.DisconnectReason) => {
      console.log(`SocketService Reason: ${reason}`);
      socket.connect();
    });

    socket.on('connect_error', (error: Error) => {
      console.log('SocketService error: ', `${error}`);
      socket.connect();
    });
  }
}

export const socketService = new SocketService();
