import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
})
export class AppComponent {
  protected readonly title = signal('banking-application');
}
