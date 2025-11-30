import { json } from "express";
import Room from "../entities/Room.js";

/**
 * 
 * @param {WebSocket} wss 
 * @param {Room} room 
 * @param {string} sender
 * @param {String} message 
 */
export default function broadCastTooRoom( room, sender, message ){
    room.users.forEach( user => {
        user.client.send(JSON.stringify({
            sender,
            message,
            roomId: room.id,
            timestamp: new Date().toISOString()
        }));
    });
}