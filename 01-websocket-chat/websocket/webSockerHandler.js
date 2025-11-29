import RoomManager from "./managers/RoomManager.js";
import UserManager from "./managers/UserManager.js";
import { WebSocketServer } from "ws";

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
        this.handleJoiningRooms();
    }

    handleJoiningRooms(){
        this.wss.on('connection', (ws, request) => {
            const url = new URL(request.url, `http://${request.headers.host}`);
            let roomId = url.searchParams.get('room');
            const userName = url.searchParams.get('name');

            const user = this.userManager.createUser(userName);

            if(!roomId){
                roomId = 'main';
            }

            console.log(`${user.name} Connected to room ${roomId}`);
            this.roomManager.joinRoom(roomId, user);
        });
    }

    handl

    
}