import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {MyProfileComponent} from "./components/my-profile/my-profile.component";
import {HeaderCComponent} from "./components/header-c/header-c.component";
import {FooterCComponent} from "./components/footer-c/footer-c.component";
import {MainCComponent} from "./components/main-c/main-c.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DonationComponent } from './components/donation/donation.component';
import { ProductsComponent } from './components/products/products.component';
import { AddRequestComponent } from './components/donation/add-request/add-request.component';
import { CreateRequestComponent } from './components/donation/create-request/create-request.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { BlogComponent } from './components/blog/blog.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';




@NgModule({
  declarations: [
    MyProfileComponent,
    EditProfileComponent,
    HeaderCComponent,
    MainCComponent,
    FooterCComponent,
    DonationComponent,
    ProductsComponent,
    AddRequestComponent,
    CreateRequestComponent,
    AddProductComponent,
    BlogComponent,
    AddBlogComponent,
    UpdatePasswordComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  exports: [
    MyProfileComponent,
    EditProfileComponent,
    HeaderCComponent,
    MainCComponent,
    FooterCComponent
  ]
})
export class ClientModule { }
