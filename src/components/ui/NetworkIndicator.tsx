import { Globe2 } from "lucide-react";

export default function NetworkIndicator() {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2"
      title="Blockchain network has not been configured"
    >
      <Globe2 size={14} className="text-amber-400" />

      <span className="whitespace-nowrap text-xs text-amber-300">
        Network TBD
      </span>
    </div>
  );
}
