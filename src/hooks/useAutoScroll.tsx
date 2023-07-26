import { useEffect, useRef, useState } from "react";
import { scrollToBottom } from "../utils/scrollUtils";

interface Props {
  listeners: React.DependencyList;
}

export const useAutoScroll = ({ listeners }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pause, setPause] = useState(false);

  const scrollDown = () => {
    scrollToBottom(ref.current);
  };

  useEffect(() => {
    if (!pause) {
      scrollDown();
    }
  }, [pause, ...listeners]);

  return { ref, pause, setPause, scrollDown };
};
