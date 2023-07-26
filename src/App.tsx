import { useMessageSocket } from "./hooks/useMessageSocket";
import { isAtBottom } from "./utils/scrollUtils";
import { useAutoScroll } from "./hooks/useAutoScroll";
import { MainBox } from "./components/MainBox";

const App = () => {
  const { messages, sendMessage, closeSocket, openSocket, isSocketOpen } =
    useMessageSocket(() => {
      validatePause();
    });

  const {
    ref: outerDiv,
    pause,
    setPause,
    scrollDown,
  } = useAutoScroll({
    listeners: [messages],
  });

  const validatePause = () => {
    const _pause = isAtBottom(outerDiv.current);
    setPause(_pause);
  };

  return (
    <div className="flex h-screen flex-col overflow-auto">
      <MainBox
        messages={messages}
        outerDiv={outerDiv}
        pause={pause}
        setPause={setPause}
        validatePause={validatePause}
        sendMessage={sendMessage}
        scrollDown={scrollDown}
        closeSocket={closeSocket}
        isSocketOpen={isSocketOpen}
        openSocket={openSocket}
      />
    </div>
  );
};

export default App;
