import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenStorage } from '../auth/token-storage';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(TokenStorage);
  const token = store.getToken();

  if (token) {
    const isFormData = req.body instanceof FormData;

    req = req.clone({
      setHeaders: {
        Authorization: `Token ${token}`, 
        ...(isFormData ? {} : { 'Content-Type': req.headers.get('Content-Type') || 'application/json' })
      }
    });
  }

  return next(req);
};


