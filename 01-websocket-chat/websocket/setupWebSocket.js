import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

export default function setupWebSocket(server) {
  const wss = new WebSocketServer({ server });
  const rooms = new Map();

  wss.on('connection', function connection(ws, request) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    let room = url.searchParams.get('room');


    if(!room){
      room = 'main';
    }

    console.log(`New connection to room: ${room}`);

  });
}