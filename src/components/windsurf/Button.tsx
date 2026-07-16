"use client";

import * as React from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

export function Button({ variant = "primary", fullWidth, className, ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-60 disabled:cursor-not-allowed";

  const variants: Record<Variant, string> = {
    primary:
      "bg-[#041536] hover:bg-[#0b2a63] text-white focus-visible:ring-[#041536]",
    secondary:
      "bg-white text-[#020617] border border-[#e5e7eb] hover:bg-[#f3f4f6] focus-visible:ring-[#d1d5db]",
    ghost:
      "bg-transparent text-[#020617] hover:bg-[#f3f4f6]",
    danger:
      "bg-[#b91c1c] hover:bg-[#991b1b] text-white focus-visible:ring-[#b91c1c]",
  };

  return (
    <button
      className={clsx(base, variants[variant], fullWidth && "w-full", className)}
      {...props}
    />
  );
}
