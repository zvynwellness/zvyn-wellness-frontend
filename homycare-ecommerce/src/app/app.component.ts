import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ZVyn Wellness';
  authMode: 'login' | null = null;
  fullName = '';
  email = '';
  password = '';
  authError = '';
  authMessage = '';
  submitting = false;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void { this.auth.restoreAccount(); }

  openAuth(mode: 'login'): void {
    this.authMode = mode;
    this.authError = '';
    this.authMessage = '';
    this.password = '';
  }

  closeAuth(): void { this.authMode = null; }

  submitAuth(): void {
    this.authError = '';
    this.authMessage = '';

    const normalizedEmail = this.email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!normalizedEmail) {
      this.authError = 'Please enter your email address.';
      return;
    }
    if (!emailPattern.test(normalizedEmail)) {
      this.authError = 'Please enter a valid email address, for example name@example.com.';
      return;
    }
    if (!this.password) {
      this.authError = 'Please enter a password.';
      return;
    }
    this.submitting = true;
    const request = this.auth.login(normalizedEmail, this.password);

    request.subscribe({
      next: () => {
        this.submitting = false;
        this.closeAuth();
        const destination = this.auth.account?.role === 'EMPLOYEE'
          ? '/employee-dashboard'
          : this.auth.account?.role === 'ADMIN' ? '/admin-dashboard' : '/reservations';
        this.router.navigate([destination]);
      },
      error: error => {
        this.submitting = false;
        if (error.status === 401 || error.status === 403) {
          this.authError = 'The email address or password is incorrect.';
        } else if (error.status === 0) {
          this.authError = 'The ZVyn server is unavailable. Please make sure the backend is running on port 8080.';
        } else {
          this.authError = `Registration could not be completed (server response ${error.status || 'unknown'}). Please try again.`;
        }
      }
    });
  }
}
