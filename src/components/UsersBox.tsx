import { IUserWithCount } from "../hooks/useMessageSocket";
import { UserBtn } from "./UserBtn";

interface Props {
  allowedUsers: IUserWithCount[];
  blockedUsers: IUserWithCount[];
  showUserDialog: (user: IUserWithCount) => void;
}

export function UsersBox({
  allowedUsers,
  blockedUsers,
  showUserDialog,
}: Props): JSX.Element {
  return (
    <div className="px-4">
      <h2 className="mb-1 mt-4">Utilisateurs :</h2>
      {allowedUsers.map((u) => (
        <div key={u.username}>
          <UserBtn user={u} onUserClick={() => showUserDialog(u)} />
          &nbsp;: {u.count}
        </div>
      ))}
      {!allowedUsers.length && (
        <div className="text-sm">Aucun utilisateur sur le chat</div>
      )}
      <h2 className="mb-1 mt-4">Utilisateurs bloqués :</h2>
      {blockedUsers.map((u) => (
        <div key={u.username}>
          <UserBtn user={u} onUserClick={() => showUserDialog(u)} />
          &nbsp;: {u.count}
        </div>
      ))}
      {!blockedUsers.length && (
        <div className="text-sm">Aucun utilisateur bloqué sur le chat</div>
      )}
    </div>
  );
}
