import { useWebSocket } from "../../hooks/useWebSocket";

export default function UserInfo() {
    const { isConnected, userName, room } = useWebSocket();

    return (
        <header>
            <div className={`status ${isConnected ? 'status-connected' : 'status-disconnected'}`}>
                Status: {isConnected ? (
                    <span className="success">CONECTADO</span>
                    ) : (
                    <span className="danger">DESCONECTADO</span>
                    )}
            </div>
            <div className="user-name">
                {userName}
            </div>
            <div className="room">
                Sala: {room}
            </div>
        </header>
    );
}