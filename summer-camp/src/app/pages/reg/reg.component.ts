import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface Signup{
  name: string
  email: string
  age: number
  message: string
}

@Component({
  selector: 'app-reg',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.scss'
})
export class RegComponent {
  error = "";

  regform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [Validators.required, Validators.min(6), Validators.max(22)]),
    message: new FormControl('')
  });

  get email() {
    return this.regform.get('email')!;
  }

  errorMessage() {
    if (this.email.hasError('required')) {
      return 'Mező kitöltése kötelező';
    } else if (this.email.hasError('email')) {
      return 'Nem érvényes email cím';
    }
    return '';
  }

  reg() {
    if (!this.regform.valid) {
      this.error = "Hiba tesa";
      return;
    }

    const signup: Signup = {
      name: this.regform.value.name || '',
      email: this.regform.value.email || '',
      age: Number(this.regform.value.age) || 0,
      message: this.regform.value.message || ''
    };

    console.log('Sikeres regisztráció:', signup);
  }
}

