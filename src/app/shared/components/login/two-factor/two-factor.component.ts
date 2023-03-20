import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.css'],
})
export class TwoFactorComponent implements OnInit {
  phoneNumber!: string;
  code: FormControl = new FormControl();
  codeForm!: FormGroup;
  token!: string;
  errorMessage!: string;
  attemptCount: number = 0;
  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit(): void {}



  createForm(): void {
    this.codeForm = new FormGroup({
      code: this.code,
    });
  }

  onSubmit() {
    const loginData = {
      email: localStorage.getItem('email'),
      password: localStorage.getItem('password'),
      code: this.codeForm.value.code,
    };

    this.authService
      .login('users/login?code=' + loginData.code, loginData)
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response !== null) {
            localStorage.setItem('jwt', response.token);
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            this.router.navigate(['']);
          } else {
            this.attemptCount++;
            if (this.attemptCount >= 3) {
              localStorage.removeItem('email');
              localStorage.removeItem('password');
              localStorage.removeItem('jwt');
              this.router.navigate(['login']);
            } else {
              this.errorMessage = 'Verification code is incorrect';
            }
          }
        },
        () => {
          this.errorMessage = 'Invalid verification code.';
        }
      );
  }
}
