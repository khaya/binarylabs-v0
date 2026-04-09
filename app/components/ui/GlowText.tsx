import type { ReactNode } from "react";

export default function GlowText({
  children,
  className = "",
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}) {
  return <Tag className={`text-glow ${className}`}>{children}</Tag>;
}
