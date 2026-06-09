import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'cinetrack.jwt';

  private readonly tokenState = signal<string | null>(this.readStoredToken());
  readonly token = this.tokenState.asReadonly();
  readonly isAuthenticated = computed(() => this.tokenState() !== null);

  login(payload: LoginPayload): Observable<string> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/login`, payload).pipe(
      map((response) => response.accessToken),
      tap((token) => this.setToken(token)),
    );
  }

  register(payload: RegisterPayload): Observable<string> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/register`, payload).pipe(
      map((response) => response.accessToken),
      tap((token) => this.setToken(token)),
    );
  }

  logout(): void {
    this.tokenState.set(null);
    if (this.isBrowser()) {
      localStorage.removeItem(this.storageKey);
    }
  }

  private setToken(token: string): void {
    this.tokenState.set(token);
    if (this.isBrowser()) {
      localStorage.setItem(this.storageKey, token);
    }
  }

  private readStoredToken(): string | null {
    if (!this.isBrowser()) {
      return null;
    }

    return localStorage.getItem(this.storageKey);
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
