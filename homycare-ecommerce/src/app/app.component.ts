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
  authMode: 'login' | 'signup' | null = null;
  fullName = '';
  email = '';
  password = '';
  authError = '';
  authMessage = '';
  submitting = false;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void { this.auth.restoreAccount(); }

  openAuth(mode: 'login' | 'signup'): void {
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

    if (this.authMode === 'signup' && !this.fullName.trim()) {
      this.authError = 'Please enter your full name.';
      return;
    }
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
    if (this.authMode === 'signup' && this.password.length < 10) {
      this.authError = 'Your password must contain at least 10 characters.';
      return;
    }
    if (this.authMode === 'signup' && this.password.length > 72) {
      this.authError = 'Your password cannot contain more than 72 characters.';
      return;
    }

    this.submitting = true;
    const request = this.authMode === 'signup'
      ? this.auth.signUp(this.fullName.trim(), normalizedEmail, this.password)
      : this.auth.login(normalizedEmail, this.password);

    request.subscribe({
      next: () => {
        this.submitting = false;
        if (this.authMode === 'signup') {
          this.authMessage = 'Your account is ready. You can now log in.';
          this.authMode = 'login';
          this.password = '';
        } else {
          this.closeAuth();
          const destination = this.auth.account?.role === 'EMPLOYEE'
            ? '/employee-dashboard'
            : this.auth.account?.role === 'ADMIN' ? '/admin-dashboard' : '/reservations';
          this.router.navigate([destination]);
        }
      },
      error: error => {
        this.submitting = false;
        if (error.status === 409) {
          this.authError = 'This email already exists in the database. Please log in or use another email.';
        } else if (error.status === 400) {
          const fieldErrors = error.error?.fieldErrors;
          this.authError = fieldErrors ? Object.values(fieldErrors).join(' ') : 'Please check the registration information and try again.';
        } else if (error.status === 401) {
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
