import type { ReactElement } from "react";

export default interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: string | ReactElement;
  endIcon?: string | ReactElement;
}

const variants = {
  primary: "text-violet-50 bg-violet-800 hover:bg-violet-900",
  secondary: "text-violet-900 bg-violet-200 hover:bg-violet-300",
};

const size = {
  sm: "text-xs py-1 px-2 rounded-md",
  md: "text-sm py-2 px-3 rounded-md",
  lg: "text-xl py-3 px-7 rounded-xl",
};
const default_style = "flex cursor-pointer items-center transition-all duration-200";

export function Button(props: ButtonProps) {
  return (
    <>
      <button
        className={`${variants[props.variant]} ${size[props.size]} ${default_style} gap-1.5`}
      >
        {props.startIcon}
        {props.text}
        {props.endIcon}
      </button>
    </>
  );
}
