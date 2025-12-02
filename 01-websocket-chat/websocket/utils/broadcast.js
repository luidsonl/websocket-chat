import { json } from "express";
import Room from "../entities/Room.js";
import User from "../entities/User.js";

/**
 * 
 * @param {WebSocket} wss 
 * @param {Room} room 
 * @param {string | User} sender
 * @param {String} message 
 */
export function broadcastToRoom( room, sender, message ){
    room.users.forEach( user => {
        if(sender.id === user.id){
            return;
        }

        const data = {
            sender,
            message,
            roomId: room.id,
            timestamp: new Date().toISOString()
        };

        if (sender instanceof User){
            data.sender = sender.name;
        }

        user.client.send(JSON.stringify({
            ...data
        }));
    });
}
