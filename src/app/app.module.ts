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

import { JitsiComponentComponent } from './client/components/knowledge/jitsi-component/jitsi-component.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ScheduleMeetingComponent } from './client/components/knowledge/schedule-meeting/schedule-meeting.component';
import { FullCalendarModule } from "@fullcalendar/angular";
import { DialogModule } from "primeng/dialog";
import { ChipsModule } from "primeng/chips";
import { EditorModule } from "primeng/editor";
import { ButtonModule } from "primeng/button";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ListMeetingComponent } from './client/components/knowledge/list-meeting/list-meeting.component';
import { RessourceDetailsComponent } from './client/components/knowledge/ressource-details/ressource-details.component';
import { CommonModule } from '@angular/common';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    KnowledgeComponent,
    JitsiComponentComponent,
    ScheduleMeetingComponent,
    ListMeetingComponent,
    RessourceDetailsComponent,
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
    FormsModule,
    FullCalendarModule,
    FullCalendarModule,
    DialogModule,
    ReactiveFormsModule,
    ChipsModule,
    EditorModule,
    ButtonModule,
    InputTextareaModule,
    CommonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('759249972475126'),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
