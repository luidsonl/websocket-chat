import { useWebSocket } from "../../hooks/useWebSocket";
import './style.css';

export default function Register() {
    const { connectToRoom, loadingConnection } = useWebSocket();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const roomId = e.target.roomId.value.trim();
        const name = e.target.name.value.trim();
        connectToRoom(roomId, name);
    }


    return (
        <div className="register-form-container">
            <h2>Enter Room</h2>
            <form onSubmit={handleSubmit}>
                <fieldset disabled={loadingConnection}>
                    <label>
                        Room ID:
                        <input 
                            type="text" 
                            id="roomId" 
                            name="roomId"
                            placeholder="main"
                        />    
                    </label>
                    <label>
                        Name:
                        <input 
                            type="text" 
                            id="name" 
                            name="name"
                            placeholder="Your name"
                        />
                    </label>
                </fieldset>
                <button type="submit" disabled={loadingConnection}>
                    {loadingConnection ? "Joining..." : "Join"}
                </button>
            </form>
        </div>
    );
}