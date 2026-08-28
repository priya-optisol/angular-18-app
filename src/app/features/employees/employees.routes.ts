import { Routes } from "@angular/router";
import { roleGuard } from "../../core/guards/role.guard";
export const EMPLOYEES_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./employees.component').then(m => m.EmployeesComponent) },
    { path: 'new', canActivate: [roleGuard], loadComponent: () => import('./employee-form/employee-form.component').then(m => m.EmployeeFormComponent) },
    { path: ':id', loadComponent: () => import('./employee-form/employee-form.component').then(m => m.EmployeeFormComponent) }
]; 