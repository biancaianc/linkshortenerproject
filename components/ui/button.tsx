"use client";

import * as React from "react";

type ButtonVariant = "default" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

function cn(...classes: Array<string | null | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const baseClasses =
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-[--color-blue-500] text-[--color-white] hover:bg-[color-mix(in_oklab,var(--color-blue-500)_90%,#000)]",
  outline:
    "border border-[--color-zinc-600] text-[--color-zinc-50] hover:bg-[color-mix(in_oklab,var(--color-zinc-950)_90%,#fff)]",
  secondary:
    "bg-[--color-zinc-600] text-[--color-zinc-50] hover:bg-[color-mix(in_oklab,var(--color-zinc-600)_85%,#000)]",
  ghost:
    "text-[--color-zinc-50] hover:bg-[color-mix(in_oklab,var(--color-zinc-950)_85%,#fff)]",
  link: "text-[--color-blue-500] underline-offset-4 hover:underline",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-9 px-4 py-2",
  sm: "h-8 px-3 text-xs",
  lg: "h-10 px-6 text-base",
  icon: "h-9 w-9 p-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export default Button;
