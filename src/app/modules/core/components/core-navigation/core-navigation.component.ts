import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-core-navigation',
  templateUrl: './core-navigation.component.html',
  styleUrls: ['./core-navigation.component.scss']
})
export class CoreNavigationComponent implements OnInit, OnDestroy {

  public componentActive = true;
  //public currentUser: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    // /* Get current User instance as soon as it has been returned from server after successful login. */
    // this.authService.authenticatedUser.pipe(
    //   takeWhile(() => this.componentActive)
    // ).subscribe(
    //   user => {
    //     this.currentUser = user;
    //   }
    // )
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  /**
   * Logs out of the appliation.
   */
  public logout() {
    this.authService.logout();
  }


}
