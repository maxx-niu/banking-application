import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

import { AccountService } from '@app/global/services/account.service';

@Component({
  selector: 'app-fund-transfer',
  standalone: false,
  styleUrl: './fund-transfer.component.css',
  templateUrl: './fund-transfer.component.html',
})
export class FundTransferComponent {
  private fb = inject(NonNullableFormBuilder);
  private accountService = inject(AccountService);

  currentAccount = this.accountService.currentAccount;
  otherAccounts = this.accountService
    .getAccounts()
    .filter((account) => account.id !== this.currentAccount()?.id);

  form = this.fb.group({
    toId: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
  });

  handleSubmit() {
    if (this.form.valid) {
      const { toId, amount } = this.form.getRawValue();
      this.accountService.transferFunds(toId, amount);
    }
  }
}
