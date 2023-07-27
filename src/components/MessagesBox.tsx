import { IUserWithCount } from "../api/messageSocket";
import { Message } from "./Message";
import { MessageResumeBtn } from "./MessageResumeBtn";
import { MessageForm } from "./MessageForm";
import { useStore } from "@nanostores/react";
import { $users } from "../stores/users";
import {
  $outerDiv,
  $isScrollPaused,
  setPause,
  validatePause,
} from "../stores/scroll";
import { useScrollOnMount } from "../hooks/useScrollOnMount";
import { $filteredMessages } from "../stores/messages";

interface Props {
  showUserDialog: (user: IUserWithCount) => void;
}

export function MessagesBox({ showUserDialog }: Props): JSX.Element {
  const filteredMessages = useStore($filteredMessages);
  const users = useStore($users);
  const outerDiv = useStore($outerDiv);
  const isScrollPaused = useStore($isScrollPaused);
  useScrollOnMount();

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
        {isScrollPaused && (
          <MessageResumeBtn
            onClick={() => {
              setPause(false);
            }}
          />
        )}
      </div>
      <MessageForm />
    </div>
  );
}
