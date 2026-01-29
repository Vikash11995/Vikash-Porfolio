// Simple WebSocket server for LAN chat
// Run with: npm run server

import { WebSocketServer } from 'ws';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const wss = new WebSocketServer({ port: PORT });

function broadcastJson(data, exceptSocket) {
  const json = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client !== exceptSocket && client.readyState === 1) {
      client.send(json);
    }
  });
}

wss.on('connection', (socket, req) => {
  const ip = req.socket.remoteAddress;

  const joinEvent = {
    type: 'system',
    text: 'A user joined the chat',
    timestamp: Date.now(),
  };
  broadcastJson(joinEvent);

  socket.on('message', (raw) => {
    try {
      const data = JSON.parse(raw.toString());
      if (data && data.type === 'message' && typeof data.text === 'string') {
        const message = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          type: 'message',
          text: data.text.slice(0, 1000),
          sender: String(data.sender || 'anonymous').slice(0, 32),
          timestamp: Date.now(),
        };
        // Echo to sender and broadcast to others
        try { socket.send(JSON.stringify(message)); } catch {}
        broadcastJson(message, socket);
      }
    } catch (e) {
      // ignore malformed
    }
  });

  socket.on('close', () => {
    const leaveEvent = {
      type: 'system',
      text: 'A user left the chat',
      timestamp: Date.now(),
    };
    broadcastJson(leaveEvent);
  });
});

console.log(`WebSocket server listening on ws://0.0.0.0:${PORT}`);


