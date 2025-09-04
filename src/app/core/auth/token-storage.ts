import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class TokenStorage {
  private readonly TOKEN_KEY = 'auth-token';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

setToken(token: string): void {
  if (this.isBrowser) {
    localStorage.setItem(this.TOKEN_KEY, token);
    
  } else {
    console.warn('Not in browser, cannot save token');
  }
}


  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  clearToken(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }
}
