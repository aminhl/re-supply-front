import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { environment as env } from '../../../../environments/environment';
import { JSendResponse } from '../../../core/models/JSendResponse';
import { Observer } from 'rxjs';
import { Router } from '@angular/router';
import { TwilioService } from '../../services/TwilioService/twilio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  token!: string;
  phoneNumber!: string;
  verificationCode!: number;
  loginForm!: FormGroup;
  email!: FormControl;
  password!: FormControl;

  constructor(
    public authService: AuthService,
    private router: Router,
    private twlioService: TwilioService
  ) {
    this.initControls();
    this.createForm();
  }

  ngOnInit(): void {}

  initControls(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
  }

  createForm(): void {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  onSubmit() {
    return this.authService
      .login('users/login', this.loginForm.value)
      .subscribe((response: any) => {
        console.log(response);
        if (response !== null) {
          this.twlioService.sendVerificationCode(this.phoneNumber).subscribe(
            (res) => {
              console.log(res);
              this.router.navigate(['twoFactorAuth']);
            },
            (err) => console.error(err)
          );
        }
      });
  }
}
