import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgImageSliderModule } from 'ng-image-slider';
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
import { ProductSubmissionComponent } from './components/products/product-submission/product-submission.component';
import { SharedModule } from "../shared/shared.module";
import { AccordionModule } from 'primeng/accordion';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FileUploadModule } from 'primeng/fileupload';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';


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
    ProductSubmissionComponent,
  ],
  imports: [
    CommonModule,GalleriaModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    SharedModule,
    AccordionModule,
    SpeedDialModule,
    MenuModule,
    SplitButtonModule,
    DialogModule,
    EditorModule,
    ConfirmDialogModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule,
    ToggleButtonModule,
    NgImageSliderModule,
    CarouselModule,
  ],
  exports: [
    MyProfileComponent,
    EditProfileComponent,
    HeaderCComponent,
    MainCComponent,
    FooterCComponent,
  ],
})
export class ClientModule {}
