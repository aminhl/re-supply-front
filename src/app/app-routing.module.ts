import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import {SignupComponent} from "./shared/components/signup/signup.component";
import {MyProfileComponent} from "./client/components/my-profile/my-profile.component";
import {EditProfileComponent} from "./client/components/edit-profile/edit-profile.component";
import {MainCComponent} from "./client/components/main-c/main-c.component";
import { ForgetPasswordComponent } from './shared/components/forget-password/forget-password.component';
import { ChangePasswordAfterSubmitEmailComponent } from './shared/components/forget-password/change-password-after-submit-email/change-password-after-submit-email.component';


const routes : Routes = [
  { path: '', component: MainCComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'profile', component: MyProfileComponent},
  { path: 'editProfile', component: EditProfileComponent},
  { path: 'forgetPassword', component: ForgetPasswordComponent},
  { path: 'resetPasswordAfterSubmit', component: ChangePasswordAfterSubmitEmailComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
