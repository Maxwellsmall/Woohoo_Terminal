import type { ReactNode } from "react";

type PanelHeadingProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export default function PanelHeading({
  title,
  description,
  action,
}: PanelHeadingProps) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-white/[0.08] px-4 py-4">
      <div>
        <h2 className="text-sm font-semibold text-white">{title}</h2>

        {description && (
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        )}
      </div>

      {action}
    </div>
  );
}
