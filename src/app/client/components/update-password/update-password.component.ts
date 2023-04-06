import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth.service";

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

  onSubmit() {
    this.authService.updatePassword("users/updatePassword", this.updatePasswordForm.value)
      .subscribe((response) => console.log(response));
  }

}
