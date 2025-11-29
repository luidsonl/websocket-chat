import User from "../entities/User.js";


export default class UserManager{
    constructor(){
        /**
         * @type {Map<string, User>}
         */
        this.users = new Map();
    }

    /**
     * @param {string} name 
     * @returns {User}
     */
    createUser(name){
        const user = new User(name);
        this.users.set(user.id, user);
        return user;
    }

    /**
     * @param {string} userId 
     * @returns {User | null}
     */
    getUser(userId){
        if(this.users.has(userId)){
            return this.users.get(userId);
        }

        return null;
    }

    /**
     * @param {string} userId 
     */
    removeUser(userId){
        this.users.delete(userId);
    }
}