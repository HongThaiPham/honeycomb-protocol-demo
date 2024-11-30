import React, { PropsWithChildren } from "react";
import SolanaProvider from "./SolanaProvider";
import AppThemeProvider from "./AppThemeProvider";
import { Toaster } from "../ui/sonner";
import HoneycombProtocolProvider from "./HoneycombProtocolProvider";

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SolanaProvider>
      <HoneycombProtocolProvider>
        <Toaster richColors position="top-right" />
        <AppThemeProvider>{children}</AppThemeProvider>
      </HoneycombProtocolProvider>
    </SolanaProvider>
  );
};
