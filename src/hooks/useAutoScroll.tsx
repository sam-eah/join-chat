import { useEffect } from "react";
import { $isScrollPaused, scrollDown } from "../stores/scroll";
import { useStore } from "@nanostores/react";

interface Props {
  listeners: React.DependencyList;
  outerDiv: HTMLElement | null;
}

export const useAutoScroll = ({ listeners }: Props) => {
  const isScrollPaused = useStore($isScrollPaused);

  useEffect(() => {
    if (!isScrollPaused) {
      scrollDown();
    }
  }, [isScrollPaused, ...listeners]);
};
