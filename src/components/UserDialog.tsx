import { useEffect, useRef } from "react";
import { IUserWithCount } from "../hooks/useMessageSocket";

interface Props {
  user: IUserWithCount | null;
  filteredUsers: string[];
  setFilteredUsers: (usernames: string[]) => void;
  closeDialog: () => void;
}

export function UserDialog({
  user,
  filteredUsers,
  setFilteredUsers,
  closeDialog,
}: Props): JSX.Element {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (user && !dialog.current?.open) {
      dialog.current?.showModal();
    }
    if (!user && dialog.current?.open) {
      dialog.current?.close();
    }
  }, [user]);

  return (
    <dialog
      className="dark:bg-gray-800 dark:text-white "
      ref={dialog}
      onClick={(e) => {
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
      }}
    >
      {user && (
        <div className="rounded-xl border border-gray-500 p-4">
          <h1 style={{ color: user.color }} className="text-lg font-bold">
            {user.username}
          </h1>
          <p className="mb-2">{user.count} message(s) envoyé(s)</p>
          {filteredUsers.includes(user.username) ? (
            <button
              className="rounded-lg bg-purple-500 px-3 py-2 text-sm font-bold text-white hover:bg-purple-700"
              onClick={() => {
                setFilteredUsers(
                  filteredUsers.filter((u) => u !== user.username),
                );
                closeDialog();
              }}
            >
              Unblock user
            </button>
          ) : (
            <button
              className="rounded-lg bg-red-500 px-3 py-2 text-sm font-bold text-white hover:bg-red-700"
              onClick={() => {
                setFilteredUsers([...filteredUsers, user.username]);
                closeDialog();
              }}
            >
              Block user
            </button>
          )}
        </div>
      )}
    </dialog>
  );
}
