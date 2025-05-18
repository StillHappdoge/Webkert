import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Newuser } from '../../shared/models/newuser';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
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
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  errormsg = "";
  constructor(
    private router: Router,
    private auth:AuthService
  ){
  }
  registrationform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,Validators.minLength(6)]),
    re_password: new FormControl('', [Validators.required]),
  });



  get email() {
    return this.registrationform.get('email')!;
  }

  errorMessage() {
    if (this.email.hasError('required')) {
      return 'Mező kitöltése kötelező';
    } else if (this.email.hasError('email')) {
      return 'Nem érvényes email cím';
    }
    return '';
  }
  reg(){
    if (this.registrationform.invalid) {
      this.errormsg = 'Please correct any errors on the form before submitting.';
      return;
    }

    const password = this.registrationform.value.password;
    const re_password = this.registrationform.value.re_password;

    if (password !== re_password) {
      this.errormsg = 'The passwords do not match.';
      return;
    }

    const userData: Partial<Newuser>={
      email: this.registrationform.value.email||'',
      name: this.registrationform.value.name||'',
      username: this.registrationform.value.username||'',
      password: this.registrationform.value.password||'',
      signups:[]
    };
    const email = this.registrationform.value.email||'';
    const pw = this.registrationform.value.password||'';
    this.auth.signUp(email,pw,userData).then(userCredential=>{
    
        console.log('Registration succesful:', userCredential.user);
        this.auth.updateLoginStatus(true);
        window.location.href="/home"
    }).catch(error =>{
      console.error('Regisztrációs hiba: ',error);
      
      switch(error.code){
        case 'auth/email-already-in-use':
          this.errormsg = 'This email already in use.';
          break;
        case 'auth/invalid-email':
          this.errormsg = 'Invalid email.';
          break;
        case 'auth/weak-password':
            this.errormsg = 'The password is too weak. Use at least 6 characters.';
            break;
        default:
            this.errormsg = 'An error has occurred during registration. Please try again later.';
      }
    })
  }
}

