import { useWebSocket } from "../../hooks/useWebSocket";
import Register from "../Register";
import Chat from "../Chat";
import './style.css'
import UserInfo from "../UserInfo";

export default function Main() {
    const { isConnected } = useWebSocket();

    if (!isConnected) {
        return <Register />;
    }
    return (
        <section>
            <UserInfo/>
            <Chat />
        </section>
    );
}