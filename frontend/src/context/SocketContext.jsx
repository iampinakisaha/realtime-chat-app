import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo } = useAppStore();
 
  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      const handleRecieveMessage = (message) => {
        
        const { selectedChatData, selectedChatType, addMessage, selectedChatMessages } = useAppStore.getState();
        console.log("message received.", message)
        console.log("selectedChatData",selectedChatData)
        console.log("selectedChatType",selectedChatType)
        console.log("selectedChatMessages", selectedChatMessages)
        if (
          selectedChatType !== undefined &&
          (selectedChatData.id === message.sender._id ||
            selectedChatData.id === message.recipient._id)
        ) {
          
          addMessage(message)
          console.log("selectedChatMessages are ........", selectedChatMessages)
        }
      };

      socket.current.on("recieveMessage", handleRecieveMessage);

      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
