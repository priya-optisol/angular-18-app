import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
export const routes: Routes = [
    { path:'',loadComponent:()=>import('./features/home/home.component').then(m=>m.HomeComponent)},
    { path: 'login', loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent) },
    { path: 'employee', canActivate: [authGuard], loadChildren: () => import('./features/employees/employees.routes').then(m => m.EMPLOYEES_ROUTES) },
    {path:"**",loadComponent:()=>import('./features/not-found/not-found.component').then(m=>m.NotFoundComponent)}
];
