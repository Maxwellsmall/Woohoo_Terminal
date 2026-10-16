import PanelHeading from "../../components/layout/PanelHeading";

const columns = ["Asset", "Position", "Value", "24h Change", "Network"];

export default function AnalyticsPanel() {
  return (
    <div>
      <PanelHeading
        title="Positions & Analytics"
        description="Portfolio and network overview"
        action={
          <span className="rounded-md border border-white/10 px-2 py-1 text-[10px] text-gray-500">
            DEMO
          </span>
        }
      />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[580px] text-left">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-gray-500"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-xs text-gray-500"
              >
                No portfolio data available. Connect a supported data source to
                populate this table.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
