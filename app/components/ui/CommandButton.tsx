export default function CommandButton({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-mono text-sm font-medium transition-all duration-200";
  const variants = {
    primary:
      "bg-green text-black hover:bg-green-bright shadow-[0_0_20px_rgba(0,255,159,0.3)] hover:shadow-[0_0_30px_rgba(0,255,159,0.5)]",
    secondary:
      "border border-green/30 text-green hover:border-green/60 hover:bg-green/5",
  };

  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      <span className="text-green-dim">{">"}</span> {children}
    </a>
  );
}
