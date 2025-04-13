import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface Helper{
  name: string
  email: string
  age: number
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
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  error = false;
  msg="";

  regform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [Validators.required, Validators.min(22), Validators.max(60)]),
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
      this.msg = "Hiba tesa";
      this.error = true;
      return;
    }

    const helper: Helper = {
      name: this.regform.value.name || '',
      email: this.regform.value.email || '',
      age: Number(this.regform.value.age) || 0
    };

    this.msg = "Sikeres regisztráció";
    this.error = false; 
    console.log('Sikeres regisztráció:', helper);
  }
}


 
