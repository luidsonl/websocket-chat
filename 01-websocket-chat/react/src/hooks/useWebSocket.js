
import { useState, useEffect, useRef } from 'react';
import { WS_URL } from '../../../config/constants.js';

/**
 * @returns {{
 * isConnected: boolean,
 * messages: string[],
 * sendMessage: (message: string) => void
 * }}
 */
export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState('');
  
  const wsRef = useRef(null); 

  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    wsRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prevMessages => [data, ...prevMessages]); 
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, []);

  const sendMessage = (message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    } else {
      console.warn('Connection is not open. Unable to send message.');
    }
  };

  return { isConnected, messages, sendMessage };
};