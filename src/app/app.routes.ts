import { Routes } from '@angular/router';

import { AccountCreationComponent } from './modules/features/accounts/account-creation/account-creation.component';
import { AccountListComponent } from './modules/features/accounts/account-list/account-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-up', pathMatch: 'full' },
  { path: 'sign-up', component: AccountCreationComponent },
  { path: 'select-account', component: AccountListComponent },
];
