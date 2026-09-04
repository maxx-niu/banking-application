import { Injectable } from '@angular/core';

import type { ITransaction, IAccount } from '@app/types';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentAccount: IAccount | null = null;
  private allAccountsMap = new Map<string, IAccount>();
  private nextTransactionId = 1;

  registerAccount(account: IAccount) {
    if (this.allAccountsMap.has(account.id)) return;

    this.allAccountsMap.set(account.id, account);
  }

  setCurrentAccount(account: IAccount) {
    // If the account doesn't exist, or the account to set to is already the current, no-op
    if (!this.allAccountsMap.has(account.id) || this.currentAccount?.id === account.id) return;

    this.currentAccount = account;
  }

  getAccounts() {
    return Array.from(this.allAccountsMap.values());
  }

  /**
   * Transfers from the current active account to another account
   */
  transferFunds(toId: string, amount: number): boolean {
    const to = this.allAccountsMap.get(toId);

    // Unknown accounts, non-positive amounts, or insufficient balance are all no-ops
    if (!this.currentAccount || !to || amount <= 0 || this.currentAccount.balance < amount)
      return false;

    this.currentAccount.balance -= amount;
    to.balance += amount;

    const transaction: ITransaction = {
      id: this.nextTransactionId++,
      from: this.currentAccount.id,
      to: toId,
      amount,
      date: new Date(),
    };

    this.currentAccount.history.push(transaction);
    to.history.push(transaction);

    return true;
  }

  getTransactionHistory() {
    return this.currentAccount?.history;
  }

  getCurrentAccount() {
    return this.currentAccount;
  }
}
