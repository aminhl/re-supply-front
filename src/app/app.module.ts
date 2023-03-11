import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderCComponent } from './client/components/header-c/header-c.component';
import { FooterCComponent } from './client/components/footer-c/footer-c.component';
import { MainCComponent } from './client/components/main-c/main-c.component';
import {ClientModule} from "./client/client.module";
import {AdminModule} from "./admin/admin.module";
import {SharedModule} from "./shared/shared.module";

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
    ClientModule,
    AdminModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
