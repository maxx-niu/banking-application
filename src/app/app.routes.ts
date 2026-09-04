import { Routes } from '@angular/router';
import { AccountCreationComponent } from './modules/features/accounts/account-creation/account-creation.component';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-up', pathMatch: 'full' },
  { path: 'sign-up', component: AccountCreationComponent },
];
