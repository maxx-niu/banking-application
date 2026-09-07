import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-accounts-available',
  standalone: false,
  templateUrl: './no-accounts-available.component.html',
})
export class NoAccountsAvailableComponent {
  @Input() message = 'No other accounts available.';
}
