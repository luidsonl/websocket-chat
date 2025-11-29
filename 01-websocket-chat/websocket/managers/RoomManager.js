import Room from "../entities/Room.js";


export default class RoomManager{

    constructor(){
        /**
         * @type {Map<string, Room>}
         */
        this.rooms = new Map();
    }

    /**
     * @param {string} roomId 
     * @returns {Room}
     */
    getRoom(roomId){
        if(this.rooms.has(roomId)){
            return this.rooms.get(roomId);
        }

        const room = new Room(roomId);
        this.rooms.set(roomId, room);
        return room;
    }

    joinRoom(roomId, user){
        const room = this.getRoom(roomId);
        room.addUser(user);
    }

    leaveRoom(roomId, user){
        if(!this.rooms.has(roomId)){
            return;
        }

        const room = this.rooms.get(roomId);
        const removed = room.removeUser(user);

        if(removed && room.users.length === 0){
            this.rooms.delete(roomId);
        }
    }
}