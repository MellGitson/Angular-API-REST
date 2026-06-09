import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token();

  if (!token) {
    return next(req);
  }

  const isApiRequest = req.url.startsWith(environment.apiUrl);
  const isAuthRequest = req.url.endsWith('/login') || req.url.endsWith('/register');
  if (!isApiRequest || isAuthRequest) {
    return next(req);
  }

  const authorizedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authorizedRequest);
};
