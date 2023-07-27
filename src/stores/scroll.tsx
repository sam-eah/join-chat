import { atom } from "nanostores";
import { isAtBottom, scrollToBottom } from "../utils/scrollUtils";
import { createRef } from "react";

export const $outerDiv = atom<React.MutableRefObject<HTMLDivElement | null>>(
  createRef(),
);

export const setOuterDiv = (
  el: React.MutableRefObject<HTMLDivElement | null>,
) => {
  $outerDiv.set(el);
};

export const $isScrollPaused = atom(false);

export const setPause = (bool: boolean) => {
  $isScrollPaused.set(bool);
};

export const scrollDown = () => {
  scrollToBottom($outerDiv.get()?.current);
};

export const validatePause = () => {
  const _pause = isAtBottom($outerDiv.get()?.current);
  setPause(_pause);
};
