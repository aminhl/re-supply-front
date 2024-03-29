import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  emailExistsValidator,
  regexValid,
  validatePassword,
} from '../../../core/validators/signup.validator';
import { CookieService } from 'ngx-cookie-service';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import Swal from 'sweetalert2';
import { FirbaseAuthService } from '../../services/fireBase/fire-base-auth.service';
import { catchError, concatMap, switchMap, tap, throwError } from 'rxjs';
import { UsersService } from '../../services/fireBase/users.service';
import { user } from '@angular/fire/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  // Form controls
  signupForm!: FormGroup;
  firstName!: FormControl;
  lastName!: FormControl;
  email!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;
  phoneNumber!: FormControl;
  annualIncome!: FormControl;
  images!: FormControl;
  token!: string;

  SearchCountryField = SearchCountryField;
  PhoneNumberFormat = PhoneNumberFormat;
  CountryISO = CountryISO;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    public fireAuth: FirbaseAuthService,
    public userService: UsersService
  ) {
    this.initForm();
    this.createForm();
  }

  ngOnInit(): void {}

  initForm(): void {
    this.firstName = new FormControl('', [
      Validators.required,
      regexValid(/[0-9]/g),
    ]);
    this.lastName = new FormControl('', [
      Validators.required,
      regexValid(/[0-9]/g),
    ]);
    this.email = new FormControl(
      '',
      [Validators.required, Validators.email],
      [emailExistsValidator(this.authService)]
    );
    this.phoneNumber = new FormControl('', [Validators.required]);
    this.annualIncome = new FormControl('');
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);
    this.images = new FormControl(null, [Validators.required]);
  }

  createForm(): void {
    this.signupForm = new FormGroup(
      {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        password: this.password,
        annualIncome: this.annualIncome,
        confirmPassword: this.confirmPassword,
        images: this.images,
      },
      validatePassword('password', 'confirmPassword') as ValidatorFn
    );
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('firstName', this.signupForm.value.firstName);
    formData.append('lastName', this.signupForm.value.lastName);
    formData.append('email', this.signupForm.value.email);
    formData.append(
      'phoneNumber',
      this.signupForm.value.phoneNumber.internationalNumber
    );
    console.log('phoneNumber', this.signupForm.value.phoneNumber);
    formData.append('password', this.signupForm.value.password);
    formData.append('country', this.signupForm.value.phoneNumber.countryCode);
    formData.append('annualIncome', this.signupForm.value.annualIncome);
    formData.append('confirmPassword', this.signupForm.value.confirmPassword);
    const images = this.signupForm.get('images');

    if (images && images.valid) {
      formData.append('images', images.value, images.value.name);
    }
    this.authService
      .signup('users/signup', formData)
      .subscribe((response: any) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Welcome to ReSupply!',
          text: "Thank you for joining us. We've sent a confirmation email. Please verify your account.",
          confirmButtonText: 'Get started',
        });

        this.router.navigate(['']);
      });
    const { firstName, email, password } = this.signupForm.value;
    this.fireAuth
      .signUp(email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.userService.addUser({
            uid,
            firstName,
            email,
          })
        )
      )
      .subscribe(() => {
          console.log('U');
        });

  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.images.setValue(file);
    this.images.markAsTouched();
  }
}
