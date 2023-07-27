import { useRef } from "react";
import { IUserWithCount } from "../api/messageSocket";
import { useStore } from "@nanostores/react";
import {
  $blockedUsernames,
  addBlockedUsername,
  removeBlockedUsername,
} from "../stores/messages";
import { useUserDialog } from "../hooks/useUserDialog";

interface Props {
  user: IUserWithCount | null;
  closeDialog: () => void;
}

export function UserDialog({ user, closeDialog }: Props): JSX.Element {
  const dialog = useRef<HTMLDialogElement>(null);
  const blockedUsernames = useStore($blockedUsernames);

  useUserDialog(user, dialog.current);

  const click = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    const dialogDimensions = dialog.current?.getBoundingClientRect();
    if (!dialogDimensions) return;
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeDialog();
    }
  };

  const blockUser = () => {
    if (!user) return;
    addBlockedUsername(user.username);
    closeDialog();
  };

  const unBlockUser = () => {
    if (!user) return;
    removeBlockedUsername(user.username);
    closeDialog();
  };

  return (
    <dialog
      className="dark:bg-gray-800 dark:text-white "
      ref={dialog}
      onClick={click}
    >
      {user && (
        <div className="rounded-xl border border-gray-500 p-4">
          <h1 style={{ color: user.color }} className="text-lg font-bold">
            {user.username}
          </h1>
          <p className="mb-2">{user.count} message(s) envoyé(s)</p>
          {blockedUsernames.includes(user.username) ? (
            <button
              className="rounded-lg bg-purple-500 px-3 py-2 text-sm font-bold text-white hover:bg-purple-700"
              onClick={unBlockUser}
            >
              Unblock user
            </button>
          ) : (
            <button
              className="rounded-lg bg-red-500 px-3 py-2 text-sm font-bold text-white hover:bg-red-700"
              onClick={blockUser}
            >
              Block user
            </button>
          )}
        </div>
      )}
    </dialog>
  );
}
