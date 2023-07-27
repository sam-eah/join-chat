import { atom, computed } from "nanostores";
import { removeDuplicates } from "../utils/arrayUtils";
import { $messages } from "./messages";

export const $blockedUsernames = atom<string[]>([]);
export const addBlockedUsername = (username: string) => {
  $blockedUsernames.set([...$blockedUsernames.get(), username]);
};
export const removeBlockedUsername = (username: string) => {
  $blockedUsernames.set($blockedUsernames.get().filter((u) => u !== username));
};

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
