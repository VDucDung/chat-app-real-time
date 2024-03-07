import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
export const SoketContext = createContext();

export const useSoketContext = () => {
    return useContext(SoketContext);
}
export const SoketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socket = io("https://chat-app-real-time-bvcd.onrender.com", {
                query: { userId: authUser._id },
            });
            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            })

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SoketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SoketContext.Provider>
    )
}