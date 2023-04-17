import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  updatePasswordForm!: FormGroup;
  passwordCurrent!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;

  initForm(): void {
    this.passwordCurrent = new FormControl('', Validators.required);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.confirmPassword = new FormControl('',[
      Validators.required,
      Validators.minLength(8)
      ]
    );
  }

  createForm(): void {
    this.updatePasswordForm = new FormGroup({
      passwordCurrent: this.passwordCurrent,
      password: this.password,
      confirmPassword: this.confirmPassword,
    })
  }
  constructor(private authService: AuthService) {
    this.initForm();
    this.createForm();
  }

  ngOnInit(): void {
  }

  errorMessage!: string;
  successMessage!: string;

  onSubmit() {
    if (this.password.dirty && this.confirmPassword.dirty){
      if(this.confirmPassword.value === this.password.value)
        this.authService.updatePassword("users/updatePassword", this.updatePasswordForm.value)
          .subscribe((response: any) => {
            this.successMessage = "Everything is OK!";
            this.errorMessage = "";
            setTimeout(() => {
              Swal.fire({
                title: 'Password changed',
                text: 'Your password has been changed successfully',
                icon: 'success'
              });
              localStorage.setItem('jwt', response.token);
              this.passwordCurrent.patchValue("");
              this.password.patchValue("");
              this.confirmPassword.patchValue("");
            },2000)
          }, (err) => {
            if (err.error.message === "Your current password is wrong.")
              this.errorMessage = "Current Password is wrong!";
          });
      else this.errorMessage = "Passwords are not the same!";
    }


  }

}
