import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {MyProfileComponent} from "./components/my-profile/my-profile.component";
import {HeaderCComponent} from "./components/header-c/header-c.component";
import {FooterCComponent} from "./components/footer-c/footer-c.component";
import {MainCComponent} from "./components/main-c/main-c.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MyProfileComponent,
    EditProfileComponent,
    HeaderCComponent,
    MainCComponent,
    FooterCComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule
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
