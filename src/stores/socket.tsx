import { atom } from "nanostores";
import { Socket } from "socket.io-client";
import { IMessage, connectSocket } from "../api/messageSocket";
import { addMessage } from "./messages";

export const $socket = atom<Socket | null>(null);
export const setSocket = (socket: Socket) => {
  $socket.set(socket);
};

export const openSocket = () => {
  setIsSocketOpen(true);
  const _socket = connectSocket();

  _socket.on("new-message", (res: IMessage) => {
    addMessage(res);
  });
  setSocket(_socket);
};

export const closeSocket = () => {
  setIsSocketOpen(false);
  $socket.get()?.close();
};

export const sendMessage = (message: IMessage) => {
  $socket.get()?.emit("send-message", message);
};

// export const $isSocketOpen = computed([$socket], (socket) => socket?.connected);
export const $isSocketOpen = atom(false);

const setIsSocketOpen = (bool: boolean) => {
  $isSocketOpen.set(bool);
};
