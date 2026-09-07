import { Component, inject } from '@angular/core';

import { AccountService } from '@app/services/account.service';

@Component({
  selector: 'app-transaction-history',
  standalone: false,
  templateUrl: './transaction-history.component.html',
})
export class TransactionHistoryComponent {
  private accountService = inject(AccountService);

  getTransactions() {
    return this.accountService.getTransactionHistory() ?? [];
  }

  getAccountFromId(id: string) {
    return this.accountService.getAccountFromId(id);
  }
}
