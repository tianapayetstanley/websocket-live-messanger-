import { WebSocket, WebSocketServer } from 'ws';

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server is running on ws://localhost:${PORT}`);

const clients: Set<WebSocket> = new Set();

wss.on('connection', (ws: WebSocket) => {
  clients.add(ws);
  console.log('New client connected.');

  ws.on('message', (message: string) => {
    console.log(`Received: ${message}`);

    for (const client of clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected.');
  });
});
