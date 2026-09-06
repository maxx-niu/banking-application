import { Component, Input } from '@angular/core';

export type TButtonTypes = 'primary' | 'secondary';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() buttonType: TButtonTypes = 'primary';
  @Input() disabled = false;
}
