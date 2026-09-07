import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoAccountsAvailableComponent } from './no-accounts-available/no-accounts-available.component';

@NgModule({
  declarations: [ButtonComponent, NavbarComponent, NoAccountsAvailableComponent],
  imports: [CommonModule, RouterModule],
  exports: [ButtonComponent, NavbarComponent, NoAccountsAvailableComponent],
})
export class SharedModule {}
