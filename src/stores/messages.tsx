import { atom, computed } from "nanostores";
import { removeDuplicates } from "../utils/arrayUtils";
import { IMessage } from "../api/messageSocket";

export const $messages = atom<IMessage[]>([]);

export const addMessage = (message: IMessage) => {
  $messages.set([...$messages.get(), message]);
};

export const $blockedUsernames = atom<string[]>([]);
export const addBlockedUsername = (username: string) => {
  $blockedUsernames.set([...$blockedUsernames.get(), username]);
};
export const removeBlockedUsername = (username: string) => {
  $blockedUsernames.set($blockedUsernames.get().filter((u) => u !== username));
};

export const $filteredMessages = computed(
  [$messages, $blockedUsernames],
  (messages, blockedUsernames) =>
    messages.filter((m) => !blockedUsernames.includes(m.user.username)),
);

export const $users = computed([$messages], (messages) =>
  removeDuplicates(
    messages.map((m) => ({
      ...m.user,
      count: messages.filter((_m) => _m.user.username === m.user.username)
        .length,
    })),
    "username",
  ),
);

export const $allowedUsers = computed(
  [$users, $blockedUsernames],
  (users, blockedUsernames) =>
    users.filter((u) => !blockedUsernames.includes(u.username)),
);

export const $blockedUsers = computed(
  [$users, $blockedUsernames],
  (users, blockedUsernames) =>
    users.filter((u) => blockedUsernames.includes(u.username)),
);
