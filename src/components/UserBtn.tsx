import { IUser } from "../hooks/useMessageSocket";

interface Props {
  user: IUser;
  onUserClick?: () => void;
}
export function UserBtn({ user, onUserClick }: Props): JSX.Element {
  return (
    <button
      onClick={() => onUserClick?.()}
      style={{ color: user.color }}
      className="rounded font-bold hover:bg-gray-200 dark:hover:bg-gray-500"
    >
      {user.username}
    </button>
  );
}
