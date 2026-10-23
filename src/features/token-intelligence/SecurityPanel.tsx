import { ShieldAlert } from "lucide-react";
import type { TokenSecurity } from "../../types";

interface SecurityPanelProps {
  security: TokenSecurity;
}

const formatBooleanStatus = (value: boolean | null): string => {
  if (value === null) return "Unknown";

  return value ? "Yes" : "No";
};

export default function SecurityPanel({ security }: SecurityPanelProps) {
  const securityRows = [
    {
      label: "Contract Verified",
      value:
        security.contractVerification === "verified"
          ? "Yes"
          : security.contractVerification === "unverified"
            ? "No"
            : "Unknown",
    },
    {
      label: "Ownership Renounced",
      value: formatBooleanStatus(security.ownershipRenounced),
    },
    {
      label: "Liquidity Locked",
      value: formatBooleanStatus(security.liquidityLocked),
    },
  ];

  return (
    <section className="pt-5">
      <div className="mb-4 flex items-center gap-2">
        <ShieldAlert size={17} className="text-amber-400" />

        <h3 className="text-sm font-semibold text-white">Security Overview</h3>
      </div>

      <div className="space-y-4">
        {securityRows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{row.label}</span>

            <span className="text-sm text-amber-400">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
        <p className="text-xs leading-relaxed text-amber-200/80">
          Security information has not been independently verified. Unknown
          statuses should not be interpreted as safe or unsafe.
        </p>
      </div>
    </section>
  );
}
