import { Component, inject, input, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  type AbstractControl,
  type ValidationErrors,
} from '@angular/forms';

import { AccountService } from '@app/services/account.service';

import type { ITransaction } from '@app/types';

interface ITransactionFilters {
  minAmount: string;
  maxAmount: string;
  fromDate: string;
  toDate: string;
}

const NO_FILTERS: ITransactionFilters = {
  minAmount: '',
  maxAmount: '',
  fromDate: '',
  toDate: '',
};

@Component({
  selector: 'app-transaction-history',
  standalone: false,
  templateUrl: './transaction-history.component.html',
})
export class TransactionHistoryComponent {
  private accountService = inject(AccountService);
  private fb = inject(NonNullableFormBuilder);

  private readonly appliedFilters = signal<ITransactionFilters>(NO_FILTERS);

  readonly id = input.required<string>();

  // Filter validator
  private rangeValidator = (group: AbstractControl): ValidationErrors | null => {
    const { minAmount, maxAmount, fromDate, toDate } = group.value;
    const errors: ValidationErrors = {};

    // Make sure the min amount does not exceed the max amount in the filter
    if (minAmount && maxAmount && Number(minAmount) > Number(maxAmount)) {
      errors['amountRange'] = true;
    }

    // Make sure the fromDate never chronologically exceeds the toDate
    if (fromDate && toDate && fromDate > toDate) {
      errors['dateRange'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };

  filterForm = this.fb.group(
    {
      minAmount: [''],
      maxAmount: [''],
      fromDate: [''],
      toDate: [''],
    },
    { validators: [this.rangeValidator] },
  );

  account() {
    return this.accountService.getAccountFromId(this.id());
  }

  hasActiveFilters() {
    const { minAmount, maxAmount, fromDate, toDate } = this.appliedFilters();
    return !!(minAmount || maxAmount || fromDate || toDate);
  }

  applyFilters() {
    if (this.filterForm.invalid) return;
    this.appliedFilters.set(this.filterForm.getRawValue());
  }

  clearFilters() {
    this.filterForm.reset(NO_FILTERS);
    this.appliedFilters.set(NO_FILTERS);
  }

  getTransactions() {
    const account = this.accountService.getAccountFromId(this.id());
    if (!account) return [];

    const effect = (t: ITransaction) => (t.to === account.id ? t.amount : -t.amount);

    let balance = account.balance - account.history.reduce((sum, t) => sum + effect(t), 0);

    return account.history
      .map((transaction) => {
        balance += effect(transaction);
        return { transaction, balance };
      })
      .filter((entry) => this.matchesFilters(entry.transaction))
      .reverse();
  }

  private matchesFilters(transaction: ITransaction) {
    const { minAmount, maxAmount, fromDate, toDate } = this.appliedFilters();

    const atLeastMin = !minAmount || transaction.amount >= Number(minAmount);
    const atMostMax = !maxAmount || transaction.amount <= Number(maxAmount);

    const onOrAfterFrom = !fromDate || transaction.date >= new Date(`${fromDate}T00:00:00`);
    const onOrBeforeTo = !toDate || transaction.date <= new Date(`${toDate}T23:59:59.999`);

    return atLeastMin && atMostMax && onOrAfterFrom && onOrBeforeTo;
  }

  getAccountFromId(id: string) {
    return this.accountService.getAccountFromId(id);
  }
}
