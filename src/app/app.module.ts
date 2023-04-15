import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ClientModule} from "./client/client.module";
import {AdminModule} from "./admin/admin.module";
import {SharedModule} from "./shared/shared.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptorService} from "./shared/services/token-interceptor.service";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {OrderModule} from "ngx-order-pipe";
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientModule,
    AdminModule,
    SharedModule,
    Ng2SearchPipeModule,
    OrderModule,
    SocialLoginModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    {
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false,
          providers: [

            {
              id: FacebookLoginProvider.PROVIDER_ID,
              provider: new FacebookLoginProvider('759249972475126')
            }
          ],
          onError: (err) => {
            console.error(err);
          }
        } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
