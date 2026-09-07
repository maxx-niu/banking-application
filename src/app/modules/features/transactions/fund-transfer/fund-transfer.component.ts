import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  Validators,
  type AbstractControl,
  type ValidationErrors,
} from '@angular/forms';

import { AccountService } from '@app/services/account.service';

@Component({
  selector: 'app-fund-transfer',
  standalone: false,
  templateUrl: './fund-transfer.component.html',
})
export class FundTransferComponent {
  private fb = inject(NonNullableFormBuilder);
  private accountService = inject(AccountService);

  private transferValidator = (group: AbstractControl): ValidationErrors | null => {
    const fromId: string = group.get('fromId')?.value;
    const amount = Number(group.get('amount')?.value);

    const from = fromId ? this.accountService.getAccountFromId(fromId) : null;
    return from && amount > from.balance ? { insufficientFunds: true } : null;
  };

  form = this.fb.group(
    {
      fromId: ['', Validators.required],
      toId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
    },
    { validators: [this.transferValidator] },
  );

  lastTransfer: { amount: number; toName: string } | null = null;

  constructor() {
    // Listen for form value changes, and set the lastTransfer object to null on such an event.
    // Pipe takeUntilDestroyed() to modify the stream and make sure it ends when component unmounts
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.lastTransfer = null;
    });
  }

  getAccounts() {
    return this.accountService.getAccounts();
  }

  fromOptions() {
    return this.getAccounts().filter((account) => account.id !== this.form.getRawValue().toId);
  }

  toOptions() {
    return this.getAccounts().filter((account) => account.id !== this.form.getRawValue().fromId);
  }

  canSwapAccounts() {
    const { fromId, toId } = this.form.getRawValue();
    return !!fromId && !!toId;
  }

  handleSwapAccounts() {
    const { fromId, toId } = this.form.getRawValue();
    this.form.patchValue({ fromId: toId, toId: fromId });
  }

  handleSubmit() {
    if (this.form.invalid) return;

    const { fromId, toId, amount } = this.form.getRawValue();
    const recipient = this.accountService.getAccountFromId(toId);

    if (!this.accountService.transferFunds(fromId, toId, Number(amount))) return;

    // Clear the form and display the success badge on successful transfer
    this.form.reset();
    this.lastTransfer = { amount: Number(amount), toName: recipient?.name ?? 'the account' };
  }
}
