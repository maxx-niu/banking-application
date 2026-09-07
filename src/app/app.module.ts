import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AccountsModule } from './modules/features/accounts/accounts.module';
import { SharedModule } from './modules/shared/shared.module';
import { ValidCurrencyDirective } from './global/directives/valid-currency.directive';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AccountsModule,
    SharedModule,
    ValidCurrencyDirective,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
