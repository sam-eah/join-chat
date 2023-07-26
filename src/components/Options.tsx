import { IconSvg } from "./IconSvg";

interface Props {
  isSocketOpen: boolean;
  closeSocket: () => void;
  openSocket: () => void;
}

export function Options({
  isSocketOpen,
  closeSocket,
  openSocket,
}: Props): JSX.Element {
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
