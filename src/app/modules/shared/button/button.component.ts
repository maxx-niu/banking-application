import { Component, Input } from '@angular/core';

export enum EButtonTypes {
  primary = 'primary',
  secondary = 'secondary',
}

@Component({
  selector: 'app-button',
  standalone: false,
  styleUrl: './button.component.css',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() buttonType: EButtonTypes = EButtonTypes.primary;
  @Input() disabled = false;
}
