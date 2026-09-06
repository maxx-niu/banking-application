import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from '@app/global/services/account.service';

import type { IAccount, TAccountType } from '@app/types';

@Component({
  selector: 'app-account-creation',
  standalone: false,
  templateUrl: './account-creation.component.html',
})
export class AccountCreationComponent {
  private fb = inject(NonNullableFormBuilder);
  private accountService = inject(AccountService);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    type: this.fb.control<TAccountType>('chequing', Validators.required),
    balance: [0, [Validators.required, Validators.min(0)]],
  });

  handleSubmit() {
    if (this.form.valid) {
      let accountId = crypto.randomUUID();
      while (this.accountService.checkIfAccountExists(accountId)) {
        accountId = crypto.randomUUID();
      }
      const { name, type, balance } = this.form.getRawValue();
      const account: IAccount = {
        id: accountId,
        name,
        type,
        balance: Number(balance),
        history: [],
      };
      this.accountService.registerAccount(account);
      this.accountService.setCurrentAccount(account);
      this.router.navigate(['/select-account']);
    }
  }
}
