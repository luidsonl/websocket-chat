import express from 'express';
import path from 'path';
import { createServer } from 'http'; 
import { PORT } from './config/constants.js';
import setupWebSocket from './websocket/setupWebSocket.js';

const app = express();

const server = createServer(app);

setupWebSocket(server);

app.use(express.static('dist'));

app.use((req, res) => {
    res.sendFile(path.resolve("dist/index.html"));
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
