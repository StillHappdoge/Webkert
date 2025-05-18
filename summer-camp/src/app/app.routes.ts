import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'programs',
    loadComponent: ()=>import('./pages/programs/programs.component').then(m => m.ProgramsComponent)
  },
  {
    path: 'about-us',
    loadComponent: ()=>import('./pages/about-us/about-us.component').then(m => m.AboutUsComponent)
  },
  {
    path: 'reg',
    loadComponent: () => import('./pages/reg/reg.component').then(m => m.RegComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [publicGuard]
  },
  {
    path: 'registration',
    loadComponent: () => import('./pages/registration/registration.component').then(m=>m.RegistrationComponent),
    canActivate: [publicGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  }
];
