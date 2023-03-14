import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SignupComponent} from "./components/signup/signup.component";
import {LoginComponent} from "./components/login/login.component";
import {HttpClientModule} from "@angular/common/http";
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ChangePasswordAfterSubmitEmailComponent } from './components/forget-password/change-password-after-submit-email/change-password-after-submit-email.component';



@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ChangePasswordAfterSubmitEmailComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    SignupComponent,
    LoginComponent
  ]
})
export class SharedModule { }
