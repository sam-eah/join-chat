import { useStore } from "@nanostores/react";
import { $isSocketOpen, closeSocket, openSocket } from "../stores/socket";
import { IconSvg } from "./IconSvg";

interface Props {}

export function Options({}: Props): JSX.Element {
  const isSocketOpen = useStore($isSocketOpen);

  return (
    <>
      {isSocketOpen ? (
        <button
          onClick={closeSocket}
          className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <IconSvg
            icon="pause"
            className="dark:fill-white"
            width={20}
            height={20}
          />
        </button>
      ) : (
        <button
          onClick={openSocket}
          className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <IconSvg
            icon="play"
            className="dark:fill-white"
            width={20}
            height={20}
          />
        </button>
      )}
    </>
  );
}
