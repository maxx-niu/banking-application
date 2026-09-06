import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  Validators,
  AbstractControl,
  type ValidatorFn,
} from '@angular/forms';

import { AccountService } from '@app/global/services/account.service';

@Component({
  selector: 'app-fund-transfer',
  standalone: false,
  templateUrl: './fund-transfer.component.html',
})
export class FundTransferComponent {
  private fb = inject(NonNullableFormBuilder);
  private accountService = inject(AccountService);

  private maxBalanceValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const balance = this.currentAccount()?.balance ?? 0;
      return control.value > balance ? { max: { max: balance, actual: control.value } } : null;
    };
  }

  currentAccount = this.accountService.currentAccount;
  otherAccounts = this.accountService
    .getAccounts()
    .filter((account) => account.id !== this.currentAccount()?.id);

  form = this.fb.group({
    toId: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01), this.maxBalanceValidator()]],
  });

  handleSubmit() {
    if (this.form.valid) {
      const { toId, amount } = this.form.getRawValue();
      this.accountService.transferFunds(toId, amount);
    }
  }
}
