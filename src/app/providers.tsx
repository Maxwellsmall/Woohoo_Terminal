import type { ReactNode } from "react";
import { TokenProvider } from "./TokenContext";

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return <TokenProvider>{children}</TokenProvider>;
}
