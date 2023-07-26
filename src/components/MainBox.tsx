import { useMemo, useRef, useState } from "react";
import { useUnique } from "../hooks/useUnique";
import { UsersBox } from "./UsersBox";
import { MessagesBox } from "./MessagesBox";
import { UserDialog } from "./UserDialog";
import { IMessage, IUserWithCount } from "../hooks/useMessageSocket";
import { IconSvg } from "./IconSvg";
import { Options } from "./Options";

interface Props {
  messages: IMessage[];
  outerDiv: React.RefObject<HTMLDivElement>;
  pause: boolean;
  setPause: React.Dispatch<React.SetStateAction<boolean>>;
  validatePause: () => void;
  sendMessage: (message: IMessage) => void;
  scrollDown: () => void;
  isSocketOpen: boolean;
  closeSocket: () => void;
  openSocket: () => void;
}

export function MainBox({
  messages,
  outerDiv,
  pause,
  setPause,
  validatePause,
  sendMessage,
  scrollDown,
  closeSocket,
  isSocketOpen,
  openSocket,
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [blockedUsernames, setBlockedUsernames] = useState<string[]>([]);
  const filteredMessages = useMemo(
    () => messages.filter((m) => !blockedUsernames.includes(m.user.username)),
    [messages, blockedUsernames],
  );
  const users = useUnique(
    messages.map((m) => ({
      ...m.user,
      count: messages.filter((_m) => _m.user.username === m.user.username)
        .length,
    })),
    "username",
  );
  const allowedUsers = useMemo(
    () => users.filter((u) => !blockedUsernames.includes(u.username)),
    [users, blockedUsernames],
  );
  const blockedUsers = useMemo(
    () => users.filter((u) => blockedUsernames.includes(u.username)),
    [users, blockedUsernames],
  );

  const [currentUser, setCurrentUser] = useState<IUserWithCount | null>(null);

  const [showUsersBox, setShowUsersBox] = useState(false);

  const showUserDialog = (user: IUserWithCount | null) => {
    dialog.current?.showModal();
    setCurrentUser(user);
  };

  return (
    <div className="relative flex flex-1 flex-col overflow-auto dark:bg-gray-800 dark:text-white ">
      <div className="flex items-center justify-between gap-1 px-4 py-2">
        <Options
          isSocketOpen={isSocketOpen}
          closeSocket={closeSocket}
          openSocket={openSocket}
        />
        <h1 className="text-sm font-semibold uppercase">
          {!showUsersBox ? "Chat" : "Utilisateurs"} du stream
        </h1>
        <button
          onClick={() => setShowUsersBox((showUsers) => !showUsers)}
          className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <IconSvg
            icon={showUsersBox ? "chat" : "users"}
            className="dark:fill-white"
            width={20}
            height={20}
          />
        </button>
      </div>
      {showUsersBox ? (
        <UsersBox
          allowedUsers={allowedUsers}
          blockedUsers={blockedUsers}
          showUserDialog={showUserDialog}
        />
      ) : (
        <MessagesBox
          filteredMessages={filteredMessages}
          outerDiv={outerDiv}
          pause={pause}
          setPause={setPause}
          showUserDialog={showUserDialog}
          users={users}
          validatePause={validatePause}
          scrollDown={scrollDown}
          sendMessage={sendMessage}
        />
      )}
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
            dialog.current?.close();
          }
        }}
      >
        {currentUser && (
          <UserDialog
            filteredUsers={blockedUsernames}
            setFilteredUsers={setBlockedUsernames}
            user={currentUser}
            dialog={dialog.current}
          />
        )}
      </dialog>
    </div>
  );
}
