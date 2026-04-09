import type { ReactNode } from "react";

export default function SectionWrapper({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-28 ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
