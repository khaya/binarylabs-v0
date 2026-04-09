export default function TerminalWindow({
  title = "~/terminal",
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`terminal-border rounded-lg bg-surface overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-light/50">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-muted">{title}</span>
      </div>
      <div className="p-4 font-mono text-sm">{children}</div>
    </div>
  );
}
