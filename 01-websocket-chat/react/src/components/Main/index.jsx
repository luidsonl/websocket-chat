import { useWebSocket } from "../../hooks/useWebSocket";
import Register from "../Register";
import Chat from "../Chat";

export default function Main() {
    const { isConnected } = useWebSocket();

    if (!isConnected) {
        return <Register />;
    }
    return <Chat />;
}