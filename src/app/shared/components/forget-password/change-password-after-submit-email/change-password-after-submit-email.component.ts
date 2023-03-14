import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { validatePassword } from 'src/app/core/validators/signup.validator';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-change-password-after-submit-email',
  templateUrl: './change-password-after-submit-email.component.html',
  styleUrls: ['./change-password-after-submit-email.component.css']
})
export class ChangePasswordAfterSubmitEmailComponent implements OnInit {
  forgetpwdAfterSubmitForm !: FormGroup;
  password !: FormControl;
  confirmPassword !: FormControl;
  token !:any;
  notAllowed !:boolean;
  constructor(private authService: AuthService, private router: Router,private route: ActivatedRoute) 
  {
    
    this.route.queryParams.subscribe((queryParam)=>
    {this.token=queryParam;})
    if (this.token.key==null) {
      this.notAllowed=true;
    }else{
      this.notAllowed=false;
    }
    this.initForm();
    this.createForm();
  }

  ngOnInit(): void {
    if (this.notAllowed) {
      this.router.navigate(["/forgetPassword"])
    }
  }
  initForm(): void {
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
  }
  createForm(): void {
    this.forgetpwdAfterSubmitForm = new FormGroup({
      password: this.password,
      confirmPassword: this.confirmPassword,
    }, validatePassword('password', 'confirmPassword') as ValidatorFn)
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('password', this.forgetpwdAfterSubmitForm.value.password);
    formData.append('confirmPassword', this.forgetpwdAfterSubmitForm.value.confirmPassword);
    this.authService.ResetPasswordAfterSubmit("users/resetPassword/"+this.token.key+"",this.forgetpwdAfterSubmitForm.value)
    .subscribe((response: any) => {
      if (response !== null){
          this.router.navigate(["/login"])
      }
    })
  }

}
