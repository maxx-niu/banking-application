import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';

@NgModule({
  declarations: [ButtonComponent, NavbarComponent, EmptyStateComponent],
  imports: [CommonModule, RouterModule],
  exports: [ButtonComponent, NavbarComponent, EmptyStateComponent],
})
export class SharedModule {}
