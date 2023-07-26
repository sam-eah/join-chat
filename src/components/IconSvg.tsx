import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  icon: "users" | "chat" | "pause" | "play";
}

export const IconSvg = ({ icon, ...props }: Props): JSX.Element => {
  if (icon === "users")
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
        <path
          d="M7 2a4 4 0 0 0-1.015 7.87A1.334 1.334 0 0 1 4.667 11 2.667 2.667 0 0 0 2 13.667V18h2v-4.333c0-.368.298-.667.667-.667A3.32 3.32 0 0 0 7 12.047 3.32 3.32 0 0 0 9.333 13c.369 0 .667.299.667.667V18h2v-4.333A2.667 2.667 0 0 0 9.333 11c-.667 0-1.22-.49-1.318-1.13A4.002 4.002 0 0 0 7 2zM5 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
        <path d="M14 11.83V18h4v-3.75c0-.69-.56-1.25-1.25-1.25a.75.75 0 0 1-.75-.75v-.42a3.001 3.001 0 1 0-2 0z" />
      </svg>
    );

  if (icon === "chat")
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
        <path d="M11 8h2v2h-2V8zM9 8H7v2h2V8z" />
        <path
          d="m10 18 -3 -3H5a2 2 0 0 1 -2 -2V5a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-2l-3 3zm-2.172 -5L10 15.172 12.172 13H15V5H5v8h2.828z"
          fill-rule="evenodd"
          clip-rule="evenodd"
        />
      </svg>
    );

  if (icon === "pause")
    return (
      <svg viewBox="0 0 0.6 0.6" {...props}>
        <path d="M.475.1v.4a.05.05 0 0 1-.05.05h-.05A.05.05 0 0 1 .325.5V.1a.05.05 0 0 1 .05-.05h.05a.05.05 0 0 1 .05.05ZM.225.05h-.05a.05.05 0 0 0-.05.05v.4a.05.05 0 0 0 .05.05h.05A.05.05 0 0 0 .275.5V.1a.05.05 0 0 0-.05-.05Z" />
      </svg>
    );

  if (icon === "play")
    return (
      <svg viewBox="0 0 0.9 0.9" {...props}>
        <path d="M0.804 0.402 0.224 0.112A0.052 0.052 0 0 0 0.15 0.158v0.58a0.052 0.052 0 0 0 0.075 0.046l0.579 -0.29a0.052 0.052 0 0 0 0 -0.093Z" />
        <path fill="none" d="M0 0h0.9v0.9H0z" />
      </svg>
    );

  return <></>;
};
