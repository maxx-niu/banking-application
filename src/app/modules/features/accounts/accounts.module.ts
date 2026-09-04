import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountCreationComponent } from './account-creation/account-creation.component';
import { AccountListComponent } from './account-list/account-list.component';
import { NumbersOnlyDirective } from '../../../global/directives/numbers-only.directive';

@NgModule({
  declarations: [AccountCreationComponent, AccountListComponent],
  imports: [CommonModule, ReactiveFormsModule, NumbersOnlyDirective],
  exports: [AccountCreationComponent],
})
export class AccountsModule {}
