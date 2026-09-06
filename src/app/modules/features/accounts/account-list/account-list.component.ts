import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

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
  private router = inject(Router);

  accounts = this.accountService.getAccounts();
  currentAccount = this.accountService.currentAccount;

  selectAccount(account: IAccount) {
    this.accountService.setCurrentAccount(account);
    this.router.navigate(['/transfer']);
  }

  handleLogout() {
    this.accountService.logout();
    this.router.navigate(['/sign-up']);
  }
}
