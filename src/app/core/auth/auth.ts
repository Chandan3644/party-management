import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { TokenStorage } from './token-storage';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class Auth {
  private base = environment.apiBase;
  private loggedIn$: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private store: TokenStorage) {
    this.loggedIn$ = new BehaviorSubject<boolean>(this.isAuthed());
  }

  login(username: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.base}/login/`, { username, password }).pipe(
    tap(response => {
      this.store.setToken(response.token);
      this.loggedIn$.next(true);
    })
  );
}


  logout(): void {
    this.store.clearToken();
    this.loggedIn$.next(false);
  }

  isAuthed(): boolean {
    return !!this.store.getToken();
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }
}
