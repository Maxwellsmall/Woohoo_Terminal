
interface Position {
  id: number;
  token: string;
  name: string;
  amount: number;
  price: number;
  change: number;
}

const positions: Position[] = [
  {
    id: 1,
    token: "SOL",
    name: "Solana",
    amount: 12.5,
    price: 180,
    change: 4.25,
  },
  {
    id: 2,
    token: "USDC",
    name: "USD Coin",
    amount: 850,
    price: 1,
    change: 0.02,
  },
  {
    id: 3,
    token: "WWH",
    name: "Woohoo World",
    amount: 400,
    price: 2.99,
    change: -2.15,
  },
];

interface CurrencyFormatter {
  (value: number): string;
}

const formatCurrency: CurrencyFormatter = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export default function PositionTable() {
  const totalValue = positions.reduce(
    (total, position) => total + position.amount * position.price,
    0
  );

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-white">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Portfolio Positions</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Your token holdings and market values
          </p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-xs text-zinc-500">Total portfolio value</p>
          <p className="mt-1 text-xl font-semibold">
            {formatCurrency(totalValue)}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-150 text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-xs text-zinc-500">
              <th className="px-3 py-3 font-medium">Asset</th>
              <th className="px-3 py-3 text-right font-medium">Amount</th>
              <th className="px-3 py-3 text-right font-medium">Price</th>
              <th className="px-3 py-3 text-right font-medium">Value</th>
              <th className="px-3 py-3 text-right font-medium">24h change</th>
            </tr>
          </thead>

          <tbody>
            {positions.length > 0 ? (
              positions.map((position) => {
                const value = position.amount * position.price;
                const isPositive = position.change >= 0;

                return (
                  <tr
                    key={position.id}
                    className="border-b border-zinc-800/70 last:border-0 hover:bg-zinc-900/60"
                  >
                    <td className="px-3 py-4">
                      <div className="font-semibold">{position.token}</div>
                      <div className="mt-1 text-xs text-zinc-500">
                        {position.name}
                      </div>
                    </td>

                    <td className="px-3 py-4 text-right">
                      {position.amount.toLocaleString("en-US")}
                    </td>

                    <td className="px-3 py-4 text-right">
                      {formatCurrency(position.price)}
                    </td>

                    <td className="px-3 py-4 text-right font-medium">
                      {formatCurrency(value)}
                    </td>

                    <td
                      className={`px-3 py-4 text-right ${
                        isPositive ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {position.change.toFixed(2)}%
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-10 text-center text-zinc-400"
                >
                  No portfolio positions available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-zinc-500">
        Demo data only. Prices and holdings are illustrative.
      </p>
    </section>
  );
}
