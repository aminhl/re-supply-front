import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './shared/components/login/login.component';
import {SignupComponent} from "./shared/components/signup/signup.component";
import {MyProfileComponent} from "./client/components/my-profile/my-profile.component";
import {EditProfileComponent} from "./client/components/edit-profile/edit-profile.component";
import {MainCComponent} from "./client/components/main-c/main-c.component";
import {ForgetPasswordComponent} from './shared/components/forget-password/forget-password.component';
import {
  ChangePasswordAfterSubmitEmailComponent
} from './shared/components/forget-password/change-password-after-submit-email/change-password-after-submit-email.component';
import {VerifyEmailComponent} from "./shared/components/verify-email/verify-email.component";
import { AuthGuard } from './shared/authguard/auth.guard';
import { TwoFactorComponent } from './shared/components/login/two-factor/two-factor.component';
import {DonationComponent} from "./client/components/donation/donation.component";
import {ProductsComponent} from "./client/components/products/products.component";


const routes : Routes = [
  { path: '', component: MainCComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent},
  { path: 'twoFactor', component: TwoFactorComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'profile', component: MyProfileComponent, canActivate: [AuthGuard]  },
  { path: 'editProfile', component: EditProfileComponent, canActivate: [AuthGuard]  },
  { path: 'forgetPassword', component: ForgetPasswordComponent},
  { path: 'resetPasswordAfterSubmit', component: ChangePasswordAfterSubmitEmailComponent},
  { path: 'verifyEmail', component: VerifyEmailComponent},
  { path: 'myProfile', component:MyProfileComponent , canActivate: [AuthGuard]  },
  { path: 'donation', component:DonationComponent , canActivate: [AuthGuard]  },
  { path: 'products', component:ProductsComponent , canActivate: [AuthGuard]  },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
