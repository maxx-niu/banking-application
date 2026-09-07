import { Injectable, signal } from '@angular/core';

import type { ITransaction, IAccount } from '@app/types';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private nextTransactionId: number = 1;
  private allAccountsMap = signal(new Map<string, IAccount>());

  checkIfAccountExists(accountId: string) {
    return this.allAccountsMap().has(accountId);
  }

  addAccount(account: IAccount) {
    if (this.allAccountsMap().has(account.id)) return;

    this.allAccountsMap.update((currMap) => new Map(currMap).set(account.id, account));
  }

  getAccounts() {
    return Array.from(this.allAccountsMap().values());
  }

  transferFunds(fromId: string, toId: string, amount: number): boolean {
    const from = this.allAccountsMap().get(fromId);
    const to = this.allAccountsMap().get(toId);

    // Unknown accounts, non-positive amounts, or insufficient balance are all no-ops
    if (!from || !to || amount <= 0 || from.balance < amount || fromId === toId) return false;

    const transaction: ITransaction = {
      id: this.nextTransactionId++,
      from: fromId,
      to: toId,
      amount,
      date: new Date(),
    };

    this.allAccountsMap.update((curr) =>
      new Map(curr)
        .set(fromId, {
          ...from,
          balance: from.balance - amount,
          history: [...from.history, transaction],
        })
        .set(toId, {
          ...to,
          balance: to.balance + amount,
          history: [...to.history, transaction],
        }),
    );

    return true;
  }

  getTransactionHistory(id: string) {
    return this.allAccountsMap().get(id)?.history;
  }

  getAccountFromId(id: string) {
    if (this.allAccountsMap().has(id)) return this.allAccountsMap().get(id)!;
    return null;
  }
}
