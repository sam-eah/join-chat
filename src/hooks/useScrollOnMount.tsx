import { useEffect } from "react";
import { scrollDown, setPause } from "../stores/scroll";

export const useScrollOnMount = () => {
  useEffect(() => {
    setPause(false);
    scrollDown();
  }, []);
};
