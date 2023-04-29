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
import { SocialLoginModule, SocialAuthServiceConfig } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { KnowledgeComponent } from './client/components/knowledge/knowledge.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { JitsiComponentComponent } from './client/components/knowledge/jitsi-component/jitsi-component.component';
import { FormsModule } from "@angular/forms";


const config: SocketIoConfig = { url: 'http://localhost:3000', options: { withCredentials: true } };

@NgModule({
  declarations: [
    AppComponent,
    KnowledgeComponent,
    JitsiComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientModule,
    AdminModule,
    SharedModule,
    Ng2SearchPipeModule,
    OrderModule,
    SocialLoginModule,
    SocketIoModule.forRoot(config),
    FormsModule
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
