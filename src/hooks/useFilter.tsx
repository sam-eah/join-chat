import { useMemo } from "react";

export const useFilter = <K,>(arr: K[], fn: (arg0: K) => boolean) => {
  return useMemo(() => arr.filter(fn), [arr]);
};
