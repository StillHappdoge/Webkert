import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginform= new FormGroup({
    email : new FormControl(''),
    password : new FormControl('')
  
  })
  isLoading: boolean = false;
  error = false;
  msg="";
  showLoginForm: boolean = true;

  constructor(private authservice:AuthService,private router:Router) {

  }

  login() {
    this.msg = '';

    const email=this.loginform.value.email || '';
    const password=this.loginform.value.password|| '';

    this.authservice.login(email,password).then(()=>{
      this.msg="Yipee!";
      this.error=false
      window.location.href="/home";
    }).catch(error=>{
      this.msg="Oh-oh"
      this.error=true
    })
  }
}
