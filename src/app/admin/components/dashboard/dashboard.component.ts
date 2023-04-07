import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../shared/services/auth.service";
import { AdminService } from "../../services/admin.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private http: HttpClient,private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllProducts();

  }

  users: any;
  products: any;

  getAllUsers(){
    return this.authService.getUsers().subscribe((response: any) => {
      this.users = response.data.users;
    })
  }

  deleteUser(userId: string) {
    this.http.delete(`${environment.apiRoot}users/delete/${userId}`).subscribe(() => {
      this.users = this.users.filter((user) => user._id !== userId);
    });
  }

  getAllProducts() {
    return this.productService.getAllProducts().subscribe((response: any) => {
      this.products = response.data.products.map((product: any) => {
        if (product.status === 'pending') {
          product.color = '#ffe6e6';
        } else if (product.status === 'accepted') {
          product.color = '#e6ffed';
        }
        return product;
      });
    });
  }

}
