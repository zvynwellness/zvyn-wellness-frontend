import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Account {
  id: number;
  fullName: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE' | 'CUSTOMER';
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = `${environment.apiBaseUrl}/account`;
  private readonly credentialKey = 'zvyn_credentials';
  account?: Account;

  constructor(private http: HttpClient) { }

  get isAuthenticated(): boolean {
    return !!this.account || !!sessionStorage.getItem(this.credentialKey);
  }

  get authorizationHeaders(): HttpHeaders {
    const credentials = sessionStorage.getItem(this.credentialKey) ?? '';
    return new HttpHeaders({ Authorization: `Basic ${credentials}` });
  }

  login(email: string, password: string): Observable<Account> {
    const credentials = btoa(`${email}:${password}`);
    const headers = new HttpHeaders({ Authorization: `Basic ${credentials}` });
    return this.http.get<Account>(`${this.api}/me`, { headers }).pipe(
      tap(account => {
        sessionStorage.setItem(this.credentialKey, credentials);
        this.account = account;
      })
    );
  }

  signUp(fullName: string, email: string, password: string): Observable<Account> {
    return this.http.post<Account>(`${this.api}/signup`, { fullName, email, password });
  }

  restoreAccount(): void {
    if (!sessionStorage.getItem(this.credentialKey)) { return; }
    this.http.get<Account>(`${this.api}/me`, { headers: this.authorizationHeaders }).subscribe({
      next: account => this.account = account,
      error: () => this.logout()
    });
  }

  logout(): void {
    sessionStorage.removeItem(this.credentialKey);
    this.account = undefined;
  }
}
