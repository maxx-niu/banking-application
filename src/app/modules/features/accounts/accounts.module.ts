import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountCreationComponent } from './account-creation/account-creation.component';
import { AccountListComponent } from './account-list/account-list.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { NumbersOnlyDirective } from '@app/global/directives/numbers-only.directive';

@NgModule({
  declarations: [AccountCreationComponent, AccountListComponent, FundTransferComponent],
  imports: [CommonModule, ReactiveFormsModule, NumbersOnlyDirective],
  exports: [AccountCreationComponent, FundTransferComponent],
})
export class AccountsModule {}
