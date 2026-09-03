import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountCreation } from './account-creation/account-creation';
import { AccountList } from './account-list/account-list';
import { NumbersOnlyDirective } from '../../../global/directives/numbers-only-directive';

@NgModule({
  declarations: [AccountCreation, AccountList],
  imports: [CommonModule, ReactiveFormsModule, NumbersOnlyDirective],
  exports: [AccountCreation],
})
export class AccountsModule {}
