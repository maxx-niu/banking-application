import { Component, inject } from '@angular/core';

import { AccountService } from '@app/global/services/account.service';

@Component({
  selector: 'app-transaction-history',
  standalone: false,
  styleUrl: './transaction-history.component.css',
  templateUrl: './transaction-history.component.html',
})
export class TransactionHistoryComponent {
  private accountService = inject(AccountService);

  currentAccount = this.accountService.currentAccount;

  getTransactions() {
    return this.accountService.getTransactionHistory() ?? [];
  }
}
