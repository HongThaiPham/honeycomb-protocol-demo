"use client";
import React, { PropsWithChildren, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

const SolanaProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // const network = clusterApiUrl(WalletAdapterNetwork.Devnet);
  const network = "https://rpc.test.honeycombprotocol.com";
  const wallets = useMemo(() => [], []);
  const endpoint = useMemo(() => network, [network]);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default SolanaProvider;
