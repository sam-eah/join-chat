import { useMemo } from "react";

export const useUnique = <K,>(arr: K[], key: keyof K) => {
  return useMemo(
    () => [...new Map(arr.map((e) => [e[key], e])).values()],
    [arr],
  );
};
