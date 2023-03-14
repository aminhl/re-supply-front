import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailExistsValidator } from 'src/app/core/validators/signup.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
// Form controls
email !: FormControl;
forgetpwdForm !: FormGroup;
showMessage !:boolean;
incorrectEmail !:boolean;
  constructor(private authService: AuthService, private router: Router) 
  {
    this.initForm();
    this.createForm();
    this.showMessage=false;
    this.incorrectEmail=false;
  }

  ngOnInit(): void {
    
  }
  initForm(): void {
    this.email = new FormControl('', [Validators.required],[emailExistsValidator(this.authService)]);
  }
  createForm(): void {
    this.forgetpwdForm = new FormGroup({
      email: this.email,
    })

  }
  onSubmit() {
    
    const formData = new FormData();
    formData.append('email', this.forgetpwdForm.value.email);
    this.authService.forgetPassword("users/forgotPassword",this.forgetpwdForm.value)
    .subscribe(
      data => {
        this.showMessage=true
      },
      err => {
       this.incorrectEmail=true
      }
    )
    
  }
  

}
