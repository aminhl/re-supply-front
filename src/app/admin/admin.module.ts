import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import {OrderModule} from "ngx-order-pipe";

@NgModule({
  declarations: [
    DashboardComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        OrderModule,
        FormsModule
    ]
})
export class AdminModule {}
