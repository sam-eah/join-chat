import { IUserWithCount } from "../hooks/useMessageSocket";

interface Props {
  user: IUserWithCount;
  filteredUsers: string[];
  setFilteredUsers: (usernames: string[]) => void;
  dialog: HTMLDialogElement | null;
}

export function UserDialog({
  user,
  filteredUsers,
  setFilteredUsers,
  dialog,
}: Props): JSX.Element {
  return (
    <div className="rounded-xl border border-gray-500 p-4">
      <h1 style={{ color: user.color }} className="text-lg font-bold">
        {user.username}
      </h1>
      <p className="mb-2">{user.count} message(s) envoyé(s)</p>
      {filteredUsers.includes(user.username) ? (
        <button
          className="rounded-lg bg-purple-500 px-3 py-2 text-sm font-bold text-white hover:bg-purple-700"
          onClick={() => {
            setFilteredUsers(filteredUsers.filter((u) => u !== user.username));
            dialog?.close();
          }}
        >
          Unblock user
        </button>
      ) : (
        <button
          className="rounded-lg bg-red-500 px-3 py-2 text-sm font-bold text-white hover:bg-red-700"
          onClick={() => {
            setFilteredUsers([...filteredUsers, user.username]);
            dialog?.close();
          }}
        >
          Block user
        </button>
      )}
    </div>
  );
}
