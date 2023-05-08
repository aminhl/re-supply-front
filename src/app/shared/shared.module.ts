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
import { FilterByNamePipe } from './pipes/filterByName.pipe';
import { FiltreByTitleRessource } from './pipes/FiltreByTitleRessource.pipe';
import { ClaimsComponent } from './components/claims/claims.component';
import { RoomComponent } from './components/room/room.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import {} from '@angular/material/form-field';
import {} from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { DatePipe } from '@angular/common';
import { DateDisplayPipe } from './pipe/date-display.pipe';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ChangePasswordAfterSubmitEmailComponent,
    VerifyEmailComponent,
    TwoFactorComponent,
    FilterByNamePipe,
    ClaimsComponent,
    FiltreByTitleRessource,
    RoomComponent,
    DateDisplayPipe,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxIntlTelInputModule,
    BrowserAnimationsModule,
    NgxCaptchaModule,
    MatToolbarModule,
    MatIconModule,
    BrowserModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    SignupComponent,
    LoginComponent,
    VerifyEmailComponent,
    FilterByNamePipe,
    ClaimsComponent,
    FiltreByTitleRessource,
  ],
  providers: [DatePipe],
})
export class SharedModule {}
