import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '@app/services/account.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private accountService = inject(AccountService);
  private router = inject(Router);

  currentAccount = this.accountService.currentAccount;

  hasLoggedIn() {
    return !!this.accountService.currentAccount();
  }

  hasAccounts() {
    return this.accountService.getAccounts().length > 0;
  }

  handleLogout() {
    this.accountService.logout();
    this.router.navigate(['/create-account']);
  }
}
