export const PORT = 3000;
export const WS_URL = `ws://localhost:${PORT}`;

// WebSocket heartbeat configuration
export const PING_INTERVAL = 30000;  // Send ping every 30 seconds
export const PING_TIMEOUT = 35000;   // Consider connection dead after 35 seconds
