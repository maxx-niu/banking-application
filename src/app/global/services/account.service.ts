import { Injectable, signal } from '@angular/core';

import type { ITransaction, IAccount } from '@app/types';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private _currentAccount = signal<IAccount | null>(null);
  readonly currentAccount = this._currentAccount.asReadonly();
  private nextTransactionId: number = 1;

  checkIfAccountExists(accountId: string) {
    return this.allAccountsMap().has(accountId);
  }

  private allAccountsMap = signal(new Map<string, IAccount>());

  registerAccount(account: IAccount) {
    if (this.allAccountsMap().has(account.id)) return;

    this.allAccountsMap.update((currMap) => new Map(currMap).set(account.id, account));
  }

  setCurrentAccount(account: IAccount) {
    // If the account doesn't exist, or the account to set to is already the current, no-op
    if (!this.allAccountsMap().has(account.id) || this.currentAccount()?.id === account.id) return;

    this._currentAccount.set(account);
  }

  getAccounts() {
    return Array.from(this.allAccountsMap().values());
  }

  /**
   * Transfers from the current active account to another account
   */
  transferFunds(toId: string, amount: number): boolean {
    const current = this.currentAccount();
    const to = this.allAccountsMap().get(toId);

    // Unknown accounts, non-positive amounts, or insufficient balance are all no-ops
    if (!current || !to || amount <= 0 || current.balance < amount) return false;

    const transaction: ITransaction = {
      id: this.nextTransactionId++,
      from: current.id,
      to: toId,
      amount,
      date: new Date(),
    };

    this._currentAccount.update(
      (account) =>
        account && {
          ...account,
          balance: account.balance - amount,
          history: [...account.history, transaction],
        },
    );

    to.balance += amount;
    to.history.push(transaction);

    return true;
  }

  getTransactionHistory() {
    return this.currentAccount()?.history;
  }

  getAccountFromId(id: string) {
    if (this.allAccountsMap().has(id)) return this.allAccountsMap().get(id)!;
    return null;
  }

  logout() {
    this._currentAccount.set(null);
  }
}
