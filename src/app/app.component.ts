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
    if (!this.accountService.getCurrentAccount()) {
      if (this.accountService.getAccounts().length === 0) {
        // Route to account creation page
        this.router.navigate(['/sign-up']);
      }
    }
  }
}
