import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-creation',
  standalone: false,
  styleUrl: './account-creation.css',
  templateUrl: './account-creation.html',
})
export class AccountCreation {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    type: ['chequing', Validators.required],
    balance: [0, [Validators.required, Validators.min(0)]],
  });
}
