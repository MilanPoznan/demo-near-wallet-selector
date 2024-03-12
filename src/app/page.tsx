'use client'
import { useState,useContext, useEffect } from "react";
import { WalletContext } from "./layout";
import { HomeWrapper, WalletButtons } from "./Home.styles";

export default function Home() {
  const [isSigned, setIsSigned] = useState<string>()
  const walletContext = useContext(WalletContext)

  async function isWalletSigned() {
    const isSigned = await walletContext.startUp()
    console.log('isSigned', isSigned)
    setIsSigned(isSigned.isSignedIn)
  }
  useEffect(() => {
    isWalletSigned()
  }, [])

  const singIn = () => walletContext.signIn()

  const signOut = () => walletContext.signOut()

  return (
    <main>
      <HomeWrapper>
      <h1>Wallet Demo</h1>
      {
        isSigned
        ? <WalletButtons onClick={signOut}>Sign out</WalletButtons>
        : <WalletButtons onClick={singIn}>Sign in</WalletButtons>
      }

      </HomeWrapper>
    </main>
  );
}
