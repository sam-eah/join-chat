import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

const CONNECTION_URL = "wss://api.dev.stories.studio/";
const SOCKET_PATH = "/interview-test";
// const SOCKET_TRANSPORTS = ['websocket'];

export interface IUser {
  username: string;
  color: string;
}

export interface IMessage {
  text: string;
  type: "text";
  user: IUser;
}

export interface IUserWithCount extends IUser {
  count: number;
}

const connectSocket = () =>
  io(CONNECTION_URL, {
    // transport: SOCKET_TRANSPORTS,
    path: SOCKET_PATH,
  });

export const useMessageSocket = (onMessage: () => void) => {
  const socket = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isSocketOpen, setIsSocketOpen] = useState(false);

  useEffect(() => {
    openSocket();

    return closeSocket;
  }, []);

  const sendMessage = (message: IMessage) => {
    socket.current?.emit("send-message", message);
  };

  const openSocket = () => {
    setIsSocketOpen(true);
    socket.current = connectSocket();

    socket.current.on("new-message", (res: IMessage) => {
      onMessage();
      setMessages((messages) => [...messages, res]);
    });
  };

  const closeSocket = () => {
    setIsSocketOpen(false);
    socket.current?.close();
  };

  return {
    messages,
    sendMessage,
    closeSocket,
    openSocket,
    isSocketOpen,
  };
};
