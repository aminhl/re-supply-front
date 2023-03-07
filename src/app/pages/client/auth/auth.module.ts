import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {Routes} from "@angular/router";

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent
    ],
    exports: [
        SignupComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }
