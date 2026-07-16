"use client";

import * as React from "react";
import clsx from "clsx";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={clsx(
        "w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2.5 text-sm text-[#020617] placeholder:text-[#9ca3af] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2a63] focus-visible:border-transparent",
        className
      )}
      {...props}
    />
  );
});
