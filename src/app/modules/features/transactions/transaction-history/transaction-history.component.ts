import { Component, inject, input } from '@angular/core';

import { AccountService } from '@app/services/account.service';

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
    return this.accountService.getTransactionHistory(this.id()) ?? [];
  }

  getAccountFromId(id: string) {
    return this.accountService.getAccountFromId(id);
  }
}
