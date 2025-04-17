'use client';
import '@rainbow-me/rainbowkit/styles.css'; // ✅ this is required for modal styling

import { WagmiProvider, createConfig, http } from 'wagmi';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sonic } from './chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create the query client instance
const queryClient = new QueryClient();

// Wagmi config with RainbowKit
export const config = getDefaultConfig({
  appName: 'Sonic Launchpad',
  projectId: '2384e6551581c1e0ab66e58fdda55b97', // WalletConnect Project ID
  chains: [sonic],
  transports: {
    [sonic.id]: http(),
  },
});

export function Web3Provider({ children }) {
  return (
    <QueryClientProvider client={queryClient}> {/* ✅ Fixes the error */}
      <WagmiProvider config={config}>
        <RainbowKitProvider chains={[sonic]}>
          {children}
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
