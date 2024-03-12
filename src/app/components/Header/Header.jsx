import { WalletContext } from "../../layout";
import { useState,useContext, useEffect } from "react";
import { Logo, HeaderWrapper, RouteWrapper } from "./Header.styles";
import Link from "next/link";

export const Header = () => {
    const [accountId, setAccoutnId] = useState()
    const walletContext = useContext(WalletContext)
    const [isSigned, setIsSigned] = useState()

  async function isWalletSigned() {
    const {isSignedIn, accountId} = await walletContext.startUp()
    if (isSignedIn) {
      setIsSigned(isSignedIn)
      setAccoutnId(accountId)
    }
  }
  useEffect(() => {
    isWalletSigned()
    isSigned && setAccoutnId(walletContext.accountId)
  }, [])

  return (
    <div>
        <HeaderWrapper>
            <Link href='/'>
                <Logo>L</Logo>
            </Link>
            <RouteWrapper>
                <Link href="/route1">Route 1</Link>
                <Link href="/route2">Route 2</Link>
                
                {accountId && <h3> Account: {accountId}</h3>}
            
            </RouteWrapper>

        </HeaderWrapper>
    </div>
  )
}