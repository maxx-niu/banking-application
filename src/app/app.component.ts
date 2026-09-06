import { Component, signal, inject, OnInit } from '@angular/core';
import { AccountService } from './global/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
})
export class AppComponent implements OnInit {
  protected readonly title = signal('banking-application');

  private accountService = inject(AccountService);
  private router = inject(Router);

  ngOnInit(): void {
    if (this.accountService.currentAccount()) return;

    if (this.accountService.getAccounts().length === 0) {
      this.router.navigate(['/sign-up']);
    } else if (!this.accountService.currentAccount()) {
      this.router.navigate(['/select-account']);
    } else {
      // TODO: navigate to transfer page
      console.log('navigate to transfer page');
    }
  }
}
