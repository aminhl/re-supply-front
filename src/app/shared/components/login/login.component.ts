import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { environment as env } from '../../../../environments/environment';
import { JSendResponse } from '../../../core/models/JSendResponse';
import { Observer, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  token!: string;
  errorMessage!: string;

  loginForm!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  recaptcha!: FormControl;
  code?: number;
  captchaSiteKey: string = env.CAPTCHA_SITE_KEY
  submitted: boolean = false;

  constructor(public authService: AuthService, private router: Router) {
    this.initControls();
    this.createForm();
  }

  ngOnInit(): void {}

  initControls(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.recaptcha = new FormControl('', [Validators.required]);
  }

  createForm(): void {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
      recaptcha: this.recaptcha
    });
  }

  onSubmit() {
    this.submitted = true;
    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    if(this.recaptcha.value !== ""){
      this.authService.login('users/login', loginData).subscribe(
        (response: any) => {
          if ( response != null &&((response.data != null &&response.data.user != null &&response.data.usertwoFactorAuth===true) ||(response.user != null && response.user.twoFactorAuth === true))
          ) {
            localStorage.setItem('email', loginData.email);
            localStorage.setItem('password', loginData.password);
            this.router.navigate(['twoFactor']);
          } else {
            localStorage.setItem('jwt', response.token);
            this.router.navigate(['']);
          }
        },
        () => {
          this.errorMessage = 'Invalid username or password.';
          this.router.navigate(['login']);
        }
      );
    }
  }

  signinWithFacebook(event: Event) {
    event.preventDefault();
    return this.authService
      .passportOAuth2('users/auth/facebook')
      .subscribe((response) => console.log(response));
  }

  signinWithGoogle(event: Event) {
    event.preventDefault();
    return this.authService
      .passportOAuth2('users/auth/google')
      .subscribe((response) => console.log(response));
  }
}
