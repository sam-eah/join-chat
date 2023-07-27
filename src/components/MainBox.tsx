import { useState } from "react";
import { UsersBox } from "./UsersBox";
import { MessagesBox } from "./MessagesBox";
import { UserDialog } from "./UserDialog";
import { IUserWithCount } from "../api/messageSocket";
import { IconSvg } from "./IconSvg";
import { Options } from "./Options";

interface Props {}

export function MainBox({}: Props) {
  const [currentUser, setCurrentUser] = useState<IUserWithCount | null>(null);

  const [showUsersBox, setShowUsersBox] = useState(false);

  const showUserDialog = (user: IUserWithCount | null) => {
    setCurrentUser(user);
  };

  return (
    <div className="relative flex flex-1 flex-col overflow-auto dark:bg-gray-800 dark:text-white ">
      <div className="flex items-center justify-between gap-1 px-4 py-2">
        <Options />
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
        <UsersBox showUserDialog={showUserDialog} />
      ) : (
        <MessagesBox showUserDialog={showUserDialog} />
      )}
      <UserDialog user={currentUser} closeDialog={() => setCurrentUser(null)} />
    </div>
  );
}
