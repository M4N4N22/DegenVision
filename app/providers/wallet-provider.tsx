'use client'

import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiProvider, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useMemo } from 'react'

// Create QueryClient once outside component
const queryClient = new QueryClient()

interface WalletProviderProps {
  children: ReactNode
}

export default function WalletProvider({ children }: WalletProviderProps) {
  // Memoize Wagmi config so it's not recreated on every render
  const config = useMemo(
    () =>
      getDefaultConfig({
        appName: 'DegenVision',
        projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // replace with your actual project id
        chains: [sepolia],
        transports: {
          [sepolia.id]: http(),
        },
      }),
    []
  )

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
