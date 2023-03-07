import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderCComponent } from './components/client/header-c/header-c.component';
import { FooterCComponent } from './components/client/footer-c/footer-c.component';
import { MainCComponent } from './components/client/main-c/main-c.component';
import {AuthModule} from "./pages/client/auth/auth.module";
import {UserModule} from "./pages/client/user/user.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderCComponent,
    FooterCComponent,
    MainCComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
