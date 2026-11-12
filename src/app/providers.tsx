import type { ReactNode } from "react";
import { TokenProvider } from "./TokenContext";
import { PreferencesProvider } from "./PreferencesContext";

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <PreferencesProvider>
      <TokenProvider>{children}</TokenProvider>
    </PreferencesProvider>
  );
}
