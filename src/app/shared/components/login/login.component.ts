import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {environment as env} from "../../../../environments/environment";
import {JSendResponse} from "../../../core/models/JSendResponse";
import {Observer} from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token!: string;

  loginForm!: FormGroup;
  email!: FormControl;
  password!: FormControl;

  constructor(private authService: AuthService, private router: Router) {
    this.initControls();
    this.createForm();
  }

  ngOnInit(): void {
  }

  initControls(): void{
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
  }

  createForm(): void{
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    })
  }

  onSubmit() {
    return this.authService.login("users/login", this.loginForm.value)
      .subscribe((response: any) => {
        console.log(response);
        if (response !== null){
          this.token = response.token;
          localStorage.setItem("jwt", this.token);
          // if (response.data.user.role === "member")
            this.router.navigate([""])
        }
      });
  }
}
