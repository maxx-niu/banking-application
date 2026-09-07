import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AccountCreationComponent } from './account-creation/account-creation.component';
import { AccountListComponent } from './account-list/account-list.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ValidCurrencyDirective } from '@app/global/directives/valid-currency.directive';
import { SharedModule } from '@app/modules/shared/shared.module';

@NgModule({
  declarations: [
    AccountCreationComponent,
    AccountListComponent,
    FundTransferComponent,
    TransactionHistoryComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ValidCurrencyDirective, SharedModule],
  exports: [AccountCreationComponent, FundTransferComponent, TransactionHistoryComponent],
})
export class AccountsModule {}
