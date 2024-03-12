"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from './lib/registry'
import { Wallet } from "./near-wallet";
import { createContext } from 'react';
import { Header } from "./components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const WalletContext = createContext<any>(null);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const wallet = new Wallet({network: 'testnet'})
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <WalletContext.Provider value={wallet}>
            <Header />
            {children}    
            </WalletContext.Provider>
        </StyledComponentsRegistry>
        </body>
    </html>
  );
}
