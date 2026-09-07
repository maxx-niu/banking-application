import { Component, signal, inject, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
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
    if (this.accountService.getAccounts().length === 0) {
      this.router.navigate(['/create-account']);
    } else {
      this.router.navigate(['/accounts']);
    }
  }
}
