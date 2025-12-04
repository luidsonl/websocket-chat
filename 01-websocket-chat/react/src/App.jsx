import { WebSocketProvider } from "./contexts/WebSocketProvider";
import Main from "./components/Main";

export default function App() {

    return (
        <WebSocketProvider>
            <Main/>
        </WebSocketProvider>
    
    );
}
