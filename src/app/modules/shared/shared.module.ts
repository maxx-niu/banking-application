import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './components/button/button.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { ValidCurrencyDirective } from './directives/valid-currency.directive';

@NgModule({
  declarations: [ButtonComponent, NavbarComponent, EmptyStateComponent, ValidCurrencyDirective],
  imports: [CommonModule, RouterModule],
  exports: [ButtonComponent, NavbarComponent, EmptyStateComponent, ValidCurrencyDirective],
})
export class SharedModule {}
