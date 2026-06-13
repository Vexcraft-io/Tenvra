import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  return (
    <button className={`tenvra-button tenvra-button--${variant} ${className}`.trim()} {...props} />
  );
}
