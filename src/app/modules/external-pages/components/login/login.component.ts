import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { takeWhile } from 'rxjs/operators';

import { markFormGroupTouched } from '../../../../utils/helper';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {


  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  public componentActive = true;
  public isLoading = false;

  public loginForm: FormGroup;
  public loginFailed: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.authService.isAuthenticated) {
      this.router.navigate(['početna']);
    }
    this.createForm();
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  /**
   * Trigger Login process.
   */
  public login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      /* Reset alert dialog */
      this.loginFailed = false;

      this.authService.login(this.loginForm.value)
        .pipe(
          takeWhile(() => this.componentActive)
        ).subscribe(
          res => {
            this.isLoading = false;
            if (res && res.token) {
              /* User is logged in, go to the dashboard page. */
              //this.router.navigate(['dashboard']);
              console.log(res.token);
            } else {
              /* No token and user returned -> Login failed. */
              this.loginFailed = true;
            }
          },
          () => {
            /* Login failed. */
            this.isLoading = false;
            this.loginFailed = true;
          }
        )
    } else {
      markFormGroupTouched(this.loginForm);
    }
  }
  
  /**
   * Check if FormControl has an error.
   * @param formControlName Name of the FormControl instance.
   */
  public hasError(formControlName: string) {
    const control = this.loginForm.get(formControlName);

    return control && (control.touched || control.dirty) && control.invalid;
  }

  //#region  Private methods

  /**
   * Initializes Login FormGroup.
   */
  private createForm() {
    this.loginForm = this.fb.group({
      'username': new FormControl('',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur'
        }),
      'password': new FormControl('',
        {
          validators: Validators.required,
          updateOn: 'blur'
        })
    });
  }

  //#endregion

}
