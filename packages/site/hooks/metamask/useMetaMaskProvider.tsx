
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

const SignerContext = createContext<ethers.Signer | null>(null);

export function MetaMaskProvider({ children }: { children: React.ReactNode }) {
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  useEffect(() => {
    async function loadSigner() {
      try {
        if (typeof window !== "undefined" && (window as any).ethereum) {
          const provider = new ethers.BrowserProvider((window as any).ethereum);
          await provider.send("eth_requestAccounts", []);
          const s = await provider.getSigner();
          setSigner(s);
        }
      } catch (err) {
        console.error("加载 Signer 失败:", err);
        setSigner(null);
      }
    }
    loadSigner();
  }, []);

  return (
    <SignerContext.Provider value={signer}>
      {children}
    </SignerContext.Provider>
  );
}

export function useMetaMaskProvider() {
  return useContext(SignerContext);
}
