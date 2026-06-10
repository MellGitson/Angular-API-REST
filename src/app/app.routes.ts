import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { Login } from './login/login';
import { AuthService } from './services/auth';

const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isAuthenticated()) return true;
  return router.createUrlTree(['/login']);
};

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: Login },
  {
    path: 'tracks/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./track-detail/track-detail').then((m) => m.TrackDetail),
  },
  { path: '**', redirectTo: '' },
];
