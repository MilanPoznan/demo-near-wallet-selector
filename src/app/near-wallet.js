import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import "@near-wallet-selector/modal-ui/styles.css"
import networkConfig from './networkConfig'

export class Wallet {
    walletSelector;
    wallet;
    network;
    isSignedIn;
    selector;
    accountId;

    constructor({ network = networkConfig.defaultNetwork }) {

        this.network = network
      }

      // To be called when the website loads
  async startUp() {
    this.walletSelector = await setupWalletSelector({
      network: this.network,
      modules: [setupMyNearWallet()],
    });

    const isSignedIn = this.walletSelector.isSignedIn();

    if (isSignedIn) {
      this.wallet = await this.walletSelector.wallet();
      this.accountId = this.walletSelector.store.getState().accounts[0].accountId;
    }

    this.isSignedIn = isSignedIn;
    console.log(isSignedIn)
    return {isSignedIn, accountId: this.walletSelector.store.getState()?.accounts[0]?.accountId};
  }

  async signIn() {
    const selector = await setupWalletSelector({
        network: networkConfig.defaultNetwork,
        modules: [setupMyNearWallet()],
    });

    this.selector = selector
    const modal = setupModal(selector, {
      contractId: networkConfig.defaultNetwork,
    });
    modal.show();
    this.isSignedIn = true
  }

  // Sign-out method
  signOut() {
    console.log(this.wallet)
    this.wallet.signOut();
    // this.wallet = this.accountId = null;
    window.location.replace(window.location.origin + window.location.pathname);
    this.isSignedIn = false
    this.selector = undefined;
    this.accountId = undefined
    this.wallet = undefined
  }

  getWalletId() {
    console.log(this.wallet)
    if (!this.isSignedIn) return null
    return selector.store.getState().accounts[0].accountId
  }

  returnSelector() {
    return this.selector
  }
  returnAccountId() {
    return this.accountId
  }
}