import { useEffect } from "react";
import { IUserWithCount } from "../api/messageSocket";

export const useUserDialog = (
  user: IUserWithCount | null,
  dialog: HTMLDialogElement | null,
) => {
  useEffect(() => {
    if (user && !dialog?.open) {
      dialog?.showModal();
    }
    if (!user && dialog?.open) {
      dialog?.close();
    }
  }, [user]);
};
