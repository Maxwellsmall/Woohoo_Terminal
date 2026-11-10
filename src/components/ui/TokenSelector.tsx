// import { ChevronDown } from "lucide-react";

// import { useSelectedToken } from "../../app/TokenContext";

// interface TokenSelectorProps {
//   onSelect?: () => void;
// }

// export default function TokenSelector({ onSelect }: TokenSelectorProps) {
//   const { selectedToken, setSelectedToken, tokens, isLoading, isRefreshing } =
//     useSelectedToken();

//   return (
//     <div className="relative">
//       <ChevronDown
//         size={15}
//         aria-hidden="true"
//         className="pair-selector-chevron"
//       />

//       <select
//         aria-label="Select trading pair"
//         value={selectedToken?.id ?? ""}
//         disabled={isLoading || tokens.length === 0}
//         onChange={(event) => {
//           const token = tokens.find((item) => item.id === event.target.value);

//           if (token) {
//             setSelectedToken(token);
//             onSelect?.();
//           }
//         }}
//         className="pair-selector"
//       >
//         {tokens.length === 0 && (
//           <option value="">{isLoading ? "Loading pairs..." : "No pairs available"}</option>
//         )}

//         {tokens.map((token) => (
//           <option key={token.id} value={token.id}>
//             {token.symbol}/{token.quoteSymbol ?? "?"} · {token.dexId ?? "DEX"} · {token.network} · {token.pairAddress}
//           </option>
//         ))}
//       </select>
//       {isRefreshing && (
//         <span className="sr-only" role="status">
//           Refreshing trading pairs
//         </span>
//       )}
//     </div>
//   );
// }