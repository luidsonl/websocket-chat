import User from './User.js';

export default class Room{
    
    /**
     * @param {string} id 
     */
    constructor(id){
        this.id = id;
        /**
         * @type {User[]}
         */
        this.users = [];
    }

    /**
     * @param {User} user 
     */
    addUser(user){
        user.setRoom(this)
        this.users.push(user)
    }

    /**
     * @param {User} user 
     * @returns {boolean} true if the user was removed, false otherwise
     */
    removeUser(user) {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            this.users[index].unsetRoom();
            this.users.splice(index, 1);
            return true;
        }
        return false;
    }
}