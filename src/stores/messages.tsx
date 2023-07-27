import { atom, computed } from "nanostores";
import { IMessage } from "../api/messageSocket";
import { $blockedUsernames } from "./users";

export const $messages = atom<IMessage[]>([]);

export const addMessage = (message: IMessage) => {
  $messages.set([...$messages.get(), message]);
};

export const $filteredMessages = computed(
  [$messages, $blockedUsernames],
  (messages, blockedUsernames) =>
    messages.filter((m) => !blockedUsernames.includes(m.user.username)),
);
