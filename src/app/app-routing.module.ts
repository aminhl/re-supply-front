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
import {AddRequestComponent} from "./client/components/donation/add-request/add-request.component";
import {AddProductComponent} from "./client/components/products/add-product/add-product.component";
import {CreateRequestComponent} from "./client/components/donation/create-request/create-request.component";
import { BlogComponent } from './client/components/blog/blog.component';



const routes: Routes = [
  { path: '', component: MainCComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'twoFactor', component: TwoFactorComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: MyProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'editProfile',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  {
    path: 'resetPasswordAfterSubmit',
    component: ChangePasswordAfterSubmitEmailComponent,
  },
  { path: 'verifyEmail', component: VerifyEmailComponent },
  {
    path: 'myProfile',
    component: MyProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'donation', component: DonationComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  {
    path: 'createRequest',
    component: CreateRequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addProduct',
    component: AddProductComponent,
    canActivate: [AuthGuard],
  },
  { path: 'community', component: BlogComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
