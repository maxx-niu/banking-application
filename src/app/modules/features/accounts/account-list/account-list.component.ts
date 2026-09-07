import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '@app/services/account.service';

import type { IAccount } from '@app/types';

@Component({
  selector: 'app-account-list',
  standalone: false,
  templateUrl: './account-list.component.html',
})
export class AccountListComponent {
  private accountService = inject(AccountService);
  private router = inject(Router);

  currentAccount = this.accountService.currentAccount;
  otherAccounts = this.accountService
    .getAccounts()
    .filter((account) => account.id !== this.currentAccount()?.id);

  selectAccount(account: IAccount) {
    this.accountService.setCurrentAccount(account);
    this.router.navigate(['/transfer']);
  }
}
