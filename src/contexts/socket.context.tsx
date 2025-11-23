import enviroments from "@config/client/environments.config";
import useSocket from "@hooks/useSocket";
import { createContext, JSX } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { useAuthContext } from "./auth.context";

export const socketContext = createContext({} as ReturnType<typeof useSocket>);

interface SocketProviderProps {
    children: JSX.Element[] | JSX.Element;
}
export function SocketProvider({ children }: SocketProviderProps) {
    const authContext = useAuthContext();

    const socket = useSocket(enviroments.VITE_URL, {
        transports: ["websocket"],
        query: {
            ...(authContext.user?.id
                ? {
                      "x-auth": String(authContext.user?.id),
                  }
                : {}),
        },
    });
    useEffect(() => {
        // si hay user se conecta el socket
        if (authContext.user) {
            socket.connectSocket();
            return;
        }
        // si no hay user se desconecta el socket
        socket.disconnectSocket();
    }, [authContext.user]);

    return (
        <socketContext.Provider
            value={{
                ...socket,
            }}
        >
            {children}
        </socketContext.Provider>
    );
}
export const useSocketContext = () => useContext(socketContext);
