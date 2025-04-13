import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { RegComponent } from './pages/reg/reg.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'programs', component: ProgramsComponent},
    {path: 'about-us', component: AboutUsComponent},
    {path: 'reg', component: RegComponent},
    //{path: '', component: }
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', component:HomeComponent }
];
