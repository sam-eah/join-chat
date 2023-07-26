import { IMessage } from "../hooks/useMessageSocket";
import { UserBtn } from "./UserBtn";

interface Props {
  message: IMessage;
  onUserClick?: () => void;
}

export function Message({ message, onUserClick }: Props): JSX.Element {
  return (
    <>
      <div className=" group relative px-2 py-1">
        <div className="relative px-2 py-0.5 text-sm group-hover:bg-gray-100 dark:group-hover:bg-gray-700">
          <UserBtn user={message.user} onUserClick={onUserClick} />
          :&nbsp;
          {message.text}
        </div>
      </div>
    </>
  );
}
