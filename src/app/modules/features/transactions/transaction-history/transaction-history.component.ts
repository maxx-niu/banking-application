import { Component, inject, input } from '@angular/core';

import { AccountService } from '@app/services/account.service';

import type { ITransaction } from '@app/types';

@Component({
  selector: 'app-transaction-history',
  standalone: false,
  templateUrl: './transaction-history.component.html',
})
export class TransactionHistoryComponent {
  private accountService = inject(AccountService);

  readonly id = input.required<string>();

  account() {
    return this.accountService.getAccountFromId(this.id());
  }

  getTransactions() {
    const account = this.accountService.getAccountFromId(this.id());
    if (!account) return [];

    const effect = (t: ITransaction) => (t.to === account.id ? t.amount : -t.amount);

    // history doesn't include the opening deposit, so back it out of the current balance
    let balance = account.balance - account.history.reduce((sum, t) => sum + effect(t), 0);

    return account.history.map((transaction) => {
      balance += effect(transaction);
      return { transaction, balance };
    });
  }

  getAccountFromId(id: string) {
    return this.accountService.getAccountFromId(id);
  }
}
