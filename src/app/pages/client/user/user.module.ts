import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


@NgModule({
    declarations: [
        MyProfileComponent,
        EditProfileComponent
    ],
  exports: [
    MyProfileComponent,
    EditProfileComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule
    ]
})
export class UserModule { }
