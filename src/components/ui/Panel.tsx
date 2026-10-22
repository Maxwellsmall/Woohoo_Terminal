import type { ReactNode } from "react";

interface PanelProps {
  children: ReactNode;
  className?: string;
  title?: string;
  action?: ReactNode;
}

export default function Panel({
  children,
  className = "",
  title,
  action,
}: PanelProps) {
  return (
    <section
      className={`min-w-0 rounded-xl border border-white/10 bg-[#101513] ${className}`}
    >
      {(title || action) && (
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          {title && (
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-200">
              {title}
            </h2>
          )}

          {action}
        </div>
      )}

      <div className="p-4">{children}</div>
    </section>
  );
}
