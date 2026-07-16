import * as React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-2xl shadow-[0_18px_45px_rgba(15,23,42,0.06)] border border-[#e5e7eb]",
        className
      )}
      {...props}
    />
  );
}
