import { Component, inject, signal } from '@angular/core';

import { AccountService } from '@app/global/services/account.service';

import type { IAccount } from '@app/types';

@Component({
  selector: 'app-account-list',
  standalone: false,
  styleUrl: './account-list.component.css',
  templateUrl: './account-list.component.html',
})
export class AccountListComponent {
  private accountService = inject(AccountService);

  accounts = this.accountService.getAccounts();
  currentAccount = this.accountService.currentAccount;

  selectAccount(account: IAccount) {
    this.accountService.setCurrentAccount(account);
  }

  handleLogout() {
    this.accountService.logout();
  }
}
