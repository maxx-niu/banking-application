import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AccountCreationComponent } from './account-creation/account-creation.component';
import { AccountListComponent } from './account-list/account-list.component';
import { SharedModule } from '@app/modules/shared/shared.module';

@NgModule({
  declarations: [AccountCreationComponent, AccountListComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SharedModule],
})
export class AccountsModule {}
