import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', loadComponent: () => import('./pages/user-list/user-list.component').then(m => m.UserListComponent) },
];
