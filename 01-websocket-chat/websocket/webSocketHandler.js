import RoomManager from "./managers/RoomManager.js";
import UserManager from "./managers/UserManager.js";
import { WebSocketServer } from "ws";
import { broadcastToRoom } from "./utils/broadcast.js";
import User from "./entities/User.js";

export default class WebSocketHandler{

    static instance = null;

    /**
     * @param {import('http').Server} server
     */
    constructor(server){
        this.wss = new WebSocketServer({server});
        this.userManager = new UserManager();
        this.roomManager = new RoomManager();
        this.setup();
    }
    
    setup(){
        this.handleConnection();
    }

    handleConnection(){
        this.wss.on('connection', (ws, request) => {
            const url = new URL(request.url, `http://${request.headers.host}`);
            let roomId = url.searchParams.get('room');
            const userName = url.searchParams.get('name');

            const user = this.userManager.createUser(userName, ws);

            if(!roomId){
                roomId = 'main';
            }
            if(process.env.NODE_ENV === 'development'){
                console.log(`New connection: ${user.name} to room ${roomId}`);
            }
            this.roomManager.joinRoom(roomId, user);

            this.initConnection(user, roomId);
            this.setHandleMessage(user, roomId);
            this.setHandleClose(user, roomId);

        });
        
    }

    /**
     * 
     * @param {User} user 
     * @param {string} roomId 
     */
    initConnection(user, roomId){
        broadcastToRoom(this.roomManager.getRoomById(roomId), user, `${user.name} joined the room.`);
    }

    /**
     * 
     * @param {string} roomId 
     * @param {User} user 
     */
    setHandleMessage(user, roomId){
        user.client.on('message', (data) => {
            const message = data.toString();
            broadcastToRoom(this.roomManager.getRoomById(roomId), user.name, message);
        });
    }


    /**
     * 
     * @param {string} roomId 
     * @param {User} user 
     */
    setHandleClose(user, roomId){
        user.client.on('close', () => {
            this.roomManager.leaveRoom(roomId, user);
            broadcastToRoom(this.roomManager.getRoomById(roomId), 'system', `${user.name} left the room.`);
        });
    }

    
}