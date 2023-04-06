import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SignupComponent} from "./components/signup/signup.component";
import {LoginComponent} from "./components/login/login.component";
import {HttpClientModule} from "@angular/common/http";
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ChangePasswordAfterSubmitEmailComponent } from './components/forget-password/change-password-after-submit-email/change-password-after-submit-email.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { TwoFactorComponent } from './components/login/two-factor/two-factor.component';
import { AuthService } from './services/auth.service';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxCaptchaModule } from "ngx-captcha";


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ChangePasswordAfterSubmitEmailComponent,
    VerifyEmailComponent,
    TwoFactorComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxIntlTelInputModule,
    BrowserAnimationsModule,
    NgxCaptchaModule
  ],
  exports: [SignupComponent, LoginComponent, VerifyEmailComponent],
})
export class SharedModule {}
