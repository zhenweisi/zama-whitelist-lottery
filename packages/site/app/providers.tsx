
'use client';

import { ReactNode } from 'react';
import { MetaMaskProvider } from '../hooks/metamask/useMetaMaskProvider';

type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <MetaMaskProvider>
      {children}
    </MetaMaskProvider>
  );
}
