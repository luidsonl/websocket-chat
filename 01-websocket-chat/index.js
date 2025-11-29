import express from 'express';
import path from 'path';
import { createServer } from 'http'; 
import { PORT } from './config/constants.js';
import WebSocketHandler from './websocket/webSockerHandler.js';

const app = express();

const server = createServer(app);

new WebSocketHandler(server);

app.use(express.static('dist'));

app.use((req, res) => {
    res.sendFile(path.resolve("dist/index.html"));
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
