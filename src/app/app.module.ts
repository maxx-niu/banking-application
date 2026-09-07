import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { AccountsModule } from './modules/features/accounts/accounts.module';
import { SharedModule } from './modules/shared/shared.module';
import { TransactionsModule } from './modules/features/transactions/transactions.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { bindToComponentInputs: true }),
    AccountsModule,
    TransactionsModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
