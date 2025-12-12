import express from 'express';
import path from 'path';
import { createServer } from 'http'; 
import { PORT } from './config/constants.js';
import WebSocketHandler from './websocket/webSocketHandler.js';
import fs from 'fs';

const app = express();

const server = createServer(app);

new WebSocketHandler(server);

app.use(express.static('dist'));

app.use((req, res) => {
  const indexPath = "dist/index.html";
  if (fs.existsSync(indexPath)) {
    return res.sendFile(path.resolve(indexPath));
  }
    return res.status(404).send('Build the React app before running the server.');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
