import { useMessageSocket } from "./hooks/useMessageSocket";
import { useAutoScroll } from "./hooks/useAutoScroll";
import { MainBox } from "./components/MainBox";
import { useStore } from "@nanostores/react";
import { $messages } from "./stores/messages";

const App = () => {
  const { ref } = useMessageSocket();

  const messages = useStore($messages);

  useAutoScroll({
    listeners: [messages],
    outerDiv: ref.current,
  });

  return (
    <div className="flex h-screen flex-col overflow-auto">
      <MainBox />
    </div>
  );
};

export default App;
