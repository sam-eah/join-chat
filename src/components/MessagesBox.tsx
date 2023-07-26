import { useEffect } from "react";
import { IMessage, IUserWithCount } from "../hooks/useMessageSocket";
import { Message } from "./Message";
import { MessageResumeBtn } from "./MessageResumeBtn";
import { MessageForm } from "./MessageForm";

interface Props {
  outerDiv: React.RefObject<HTMLDivElement>;
  filteredMessages: IMessage[];
  users: IUserWithCount[];
  pause: boolean;
  showUserDialog: (user: IUserWithCount) => void;
  setPause: React.Dispatch<React.SetStateAction<boolean>>;
  validatePause: () => void;
  scrollDown: () => void;
  sendMessage: (message: IMessage) => void;
}

export function MessagesBox({
  outerDiv,
  filteredMessages,
  users,
  pause,
  showUserDialog,
  setPause,
  validatePause,
  scrollDown,
  sendMessage,
}: Props): JSX.Element {
  useEffect(() => {
    setPause(false);
    scrollDown();
  }, []);

  return (
    <div className="flex flex-1 flex-col overflow-auto  ">
      <div className="relative flex flex-1 flex-col overflow-auto  ">
        <div
          ref={outerDiv}
          onScroll={validatePause}
          className="h-full flex-1 overflow-auto border-t border-gray-500"
        >
          <p className="px-4 py-2 text-sm">Bienvenue sur le chat !</p>
          {filteredMessages.map((message, i) => (
            <Message
              message={message}
              key={i}
              onUserClick={() => {
                const _user = users.find(
                  (u) => u.username === message.user.username,
                );
                if (!_user) console.error("user not found");
                showUserDialog(_user!);
              }}
            />
          ))}
        </div>
        {pause && (
          <MessageResumeBtn
            onClick={() => {
              setPause(false);
            }}
          />
        )}
      </div>
      <MessageForm sendMessage={sendMessage} />
    </div>
  );
}
