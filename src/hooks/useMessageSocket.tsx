import { useEffect, useRef } from "react";
import { closeSocket, openSocket } from "../stores/socket";
import { setOuterDiv } from "../stores/scroll";

export const useMessageSocket = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOuterDiv(ref);
    openSocket();

    return closeSocket;
  }, []);

  return {
    ref,
  };
};
