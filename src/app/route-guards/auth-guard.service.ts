import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, CanActivateChild } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Injectable()
export class AuthGuardService implements CanLoad, CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate() {
    return this.isAuthenticated();
  }

  canLoad() {
    return this.isAuthenticated();
  }

  canActivateChild() {
    return this.isAuthenticated();
  }

  /**
   * Check if user has been authenticated.
   */
  private isAuthenticated(): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    if (isAuthenticated) {
      /* Logged in, so return true. */
      return true;
    }

    /* Not logged in so redirect to login page with the return url. */
    this.router.navigate(['/']);
    return false;
  }
}