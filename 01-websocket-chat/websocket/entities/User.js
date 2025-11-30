import {v4 as uuid} from 'uuid'
import Room from './Room.js';

export default class User{
    
    /**
     * @param {string} name 
     * @param {WebSocket} client
     */
    constructor(name, client){
        this.id = uuid();
        this.client = client;
        this.setName(name);
    }

    /**
     * @param {string} name 
     */
    setName(name){
        if(name){
            this.name = name;
            return;
        }

        this.name = this.id;
        return;
    }

    /**
     * @param {Room} room 
     */
    setRoom(room){
        this.roomId = room.id;
    }

    unsetRoom(){
        this.roomId = null;
    }
}