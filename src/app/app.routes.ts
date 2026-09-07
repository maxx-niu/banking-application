import { Routes } from '@angular/router';

import { AccountCreationComponent } from './modules/features/accounts/account-creation/account-creation.component';
import { AccountListComponent } from './modules/features/accounts/account-list/account-list.component';
import { FundTransferComponent } from './modules/features/transactions/fund-transfer/fund-transfer.component';
import { TransactionHistoryComponent } from './modules/features/transactions/transaction-history/transaction-history.component';

export const routes: Routes = [
  { path: '', redirectTo: 'create-account', pathMatch: 'full' },
  { path: 'create-account', component: AccountCreationComponent },
  { path: 'accounts', component: AccountListComponent },
  { path: 'transfer', component: FundTransferComponent },
  { path: 'history', component: TransactionHistoryComponent },
];
