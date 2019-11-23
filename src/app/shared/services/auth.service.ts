import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user.model';

@Injectable()
export class AuthService {

  private readonly loginUrl = '/api/auth';

  public readonly url = environment.serverUrl;
  public authenticatedUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router) {

    const user: User = JSON.parse(localStorage.getItem('user'));
    this.authenticatedUser = of(user);
  }

  /**
   * Sends a login request to server.
   * @param username Username of the user.
   * @param password Password of the user.
   */
  login(credentials: {
    username: string,
    password: string
  }): Observable<any> {
    return this.http.post(`${this.url}${this.loginUrl}`, credentials)
      .pipe(
        map(res => {
          if (res && res['token'] && res['user']) {
            /* Set token and userId in the Local storage of the browser. */
            localStorage.setItem('token', res['token']);
            localStorage.setItem('user', JSON.stringify(res['user']));

            /* Create an observable of this property. */
            this.authenticatedUser = of(res['user']);
          }

          return res;
        })
      );
  }

	/**
	 * Logout from the application.
	 */
  logout() {
    /* Removes token and user info from Local storage instance. */
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/']);
  }

  /**
   * Checks existance of token which means User has been authenticated.
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }
}