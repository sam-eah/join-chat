export function MessageResumeBtn(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
): JSX.Element {
  return (
    <button
      {...props}
      className="group absolute bottom-0 left-2/4 mb-2 -translate-x-2/4 bg-gray-600 bg-opacity-70 px-4 py-1 text-xs font-semibold hover:bg-gray-500"
    >
      <p className="block group-hover:hidden">Chat mis en pause</p>
      <p className="hidden group-hover:block">Reprendre le défilement</p>
    </button>
  );
}
