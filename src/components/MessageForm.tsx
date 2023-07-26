import { useRef, useState } from "react";
import { IMessage } from "../hooks/useMessageSocket";

interface Props {
  sendMessage: (message: IMessage) => void;
}

export function MessageForm({ sendMessage }: Props): JSX.Element {
  const [input, setInput] = useState("");
  const form = useRef<HTMLFormElement>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({
      text: input,
      type: "text",
      user: {
        username: "test",
        color: "purple",
      },
    });
    setInput("");
  };

  return (
    <form className="px-4 py-2" ref={form} onSubmit={submit}>
      <textarea
        id="chat"
        rows={2}
        className=" block w-full resize-none rounded-md border border-gray-700 bg-white p-2.5 text-sm text-gray-900  focus:border-4 focus:border-purple-500  focus:outline-purple-500 focus:ring-purple-500 focus-visible:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
        placeholder="Envoyer un message"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (
            e.key !== "Enter" ||
            e.shiftKey ||
            !input.replaceAll("\n", " ").length
          )
            return;
          e.preventDefault();
          form.current?.requestSubmit();
        }}
      />
      <div className="mt-1 flex justify-between">
        <div></div>
        <button
          className="rounded-md bg-purple-500 px-3 py-1 text-sm font-bold text-white hover:bg-purple-600"
          type="submit"
        >
          Chat
        </button>
      </div>
    </form>
  );
}
