import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './shared/components/login/login.component';
import {SignupComponent} from "./shared/components/signup/signup.component";
import {MyProfileComponent} from "./client/components/my-profile/my-profile.component";
import {EditProfileComponent} from "./client/components/edit-profile/edit-profile.component";
import {MainCComponent} from "./client/components/main-c/main-c.component";
import {ForgetPasswordComponent} from './shared/components/forget-password/forget-password.component';
import {ChangePasswordAfterSubmitEmailComponent} from './shared/components/forget-password/change-password-after-submit-email/change-password-after-submit-email.component';
import {VerifyEmailComponent} from "./shared/components/verify-email/verify-email.component";
import { AuthGuard } from './shared/authguard/auth.guard';
import { TwoFactorComponent } from './shared/components/login/two-factor/two-factor.component';
import {DonationComponent} from "./client/components/donation/donation.component";
import {ProductsComponent} from "./client/components/products/products.component";
import {AddProductComponent} from "./client/components/products/add-product/add-product.component";
import {CreateRequestComponent} from "./client/components/donation/create-request/create-request.component";
import { BlogComponent } from './client/components/blog/blog.component';
import { UpdatePasswordComponent } from "./client/components/update-password/update-password.component";
import { DashboardComponent } from "./admin/components/dashboard/dashboard.component";
import { RoleGuard } from "./shared/roleguard/role.guard";
import {ProductSubmissionComponent} from "./client/components/products/product-submission/product-submission.component";
import {ProductDetailsComponent} from "./client/components/products/product-details/product-details.component";
import { ClientBlogsComponent } from './client/components/client-blogs/client-blogs.component';
import {WishlistComponent} from "./client/components/wishlist/wishlist.component";
import { KnowledgeComponent } from "./client/components/knowledge/knowledge.component";
import { JitsiComponentComponent } from "./client/components/knowledge/jitsi-component/jitsi-component.component";
import { CartComponent } from "./client/components/cart/cart.component";
import { OrderSuccessComponent } from "./client/components/cart/order-success/order-success.component";
import { ScheduleMeetingComponent } from "./client/components/knowledge/schedule-meeting/schedule-meeting.component";
import { ListMeetingComponent } from "./client/components/knowledge/list-meeting/list-meeting.component";
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

  { path: 'myBlogs', component: ClientBlogsComponent, canActivate: [AuthGuard] },
  {
    path: 'updatePassword',
    component: UpdatePasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'productSubmission',
    component: ProductSubmissionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'productDetails/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'updatePassword', component: UpdatePasswordComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'productSubmission', component: ProductSubmissionComponent, canActivate: [AuthGuard] },
  { path: 'productDetails/:id', component: ProductDetailsComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'knowledge', component: KnowledgeComponent , canActivate: [AuthGuard]},
  { path: 'knowledge/jitsi/:id', component:JitsiComponentComponent , canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'orderSuccess', component: OrderSuccessComponent, canActivate: [AuthGuard] },
  { path: 'ScheduleMeeting', component: ScheduleMeetingComponent, canActivate: [AuthGuard] },
  { path: 'ListMeeting', component: ListMeetingComponent, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
