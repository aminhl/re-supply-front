import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from '../../services/auth.service';
import {Router} from "@angular/router";
import {isEmailPresent, regexValid, validatePassword} from "../../../core/validators/signup.validator";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // Form controls
  signupForm !: FormGroup;
  firstName !: FormControl;
  lastName!: FormControl;
  email !: FormControl;
  password !: FormControl;
  confirmPassword !: FormControl;
  phoneNumber !: FormControl;
  image !: FormControl;

  constructor(private authService: AuthService, private router: Router) {
    this.initForm();
    this.createForm();
  }

  ngOnInit(): void {
  }

  initForm(): void {
    this.firstName = new FormControl('', [Validators.required, regexValid(/[0-9]/g)]);
    this.lastName = new FormControl('', [Validators.required, regexValid(/[0-9]/g)]);
    this.email = new FormControl('', [Validators.required], [isEmailPresent()]);
    this.phoneNumber = new FormControl('', [Validators.required, regexValid(/[a-zA-Z]/g)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.image = new FormControl(null, [Validators.required]);
  }

  createForm(): void{
    this.signupForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
      confirmPassword: this.confirmPassword,
      image: this.image
    }, validatePassword('password', 'confirmPassword') as ValidatorFn)
  }
  onSubmit() {
     this.authService.signup("users/signup", this.signupForm.value)
       .subscribe((user) => this.router.navigate(['/login']));
  }

}
