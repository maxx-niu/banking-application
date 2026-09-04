import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AccountsModule } from './modules/features/accounts/accounts.module';
import { NumbersOnlyDirective } from './global/directives/numbers-only.directive';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), AccountsModule, NumbersOnlyDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
