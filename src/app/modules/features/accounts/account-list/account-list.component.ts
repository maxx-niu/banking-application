import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '@app/services/account.service';

@Component({
  selector: 'app-account-list',
  standalone: false,
  templateUrl: './account-list.component.html',
})
export class AccountListComponent {
  private accountService = inject(AccountService);
  private router = inject(Router);

  accounts = this.accountService.getAccounts();

  handleViewHistory(accountId: string) {
    this.router.navigate(['/history', accountId]);
  }
}
