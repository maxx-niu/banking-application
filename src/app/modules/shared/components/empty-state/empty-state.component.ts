import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: false,
  templateUrl: './empty-state.component.html',
})
export class EmptyStateComponent {
  @Input() message = 'Nothing available yet.';
  @Input() ctaText = '';
  @Input() ctaLink = '';
}
