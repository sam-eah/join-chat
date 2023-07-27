import { io } from "socket.io-client";

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

export const connectSocket = () =>
  io(CONNECTION_URL, {
    // transport: SOCKET_TRANSPORTS,
    path: SOCKET_PATH,
  });
