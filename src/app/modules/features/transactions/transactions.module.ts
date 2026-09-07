import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/modules/shared/shared.module';

@NgModule({
  declarations: [FundTransferComponent, TransactionHistoryComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
})
export class TransactionsModule {}
