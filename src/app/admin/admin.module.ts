import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import {OrderModule} from "ngx-order-pipe";
import {DonationManagementComponent} from "./components/dashboard/donation-management/donation-management.component";
import {UserManagementComponent} from "./components/dashboard/user-management/user-management.component";
import {ProductManagementComponent} from "./components/dashboard/product-management/product-management.component";
import { ClaimsManagementComponent } from './components/dashboard/claims-management/claims-management.component';
import { ResourcesManagementComponent } from './components/dashboard/resources-management/resources-management.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DonationManagementComponent,
    UserManagementComponent,
    ProductManagementComponent,
    ClaimsManagementComponent,
    ResourcesManagementComponent

  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        OrderModule,
        FormsModule
    ]
})
export class AdminModule {}
