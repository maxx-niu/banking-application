import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [ButtonComponent, NavbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [ButtonComponent, NavbarComponent],
})
export class SharedModule {}
