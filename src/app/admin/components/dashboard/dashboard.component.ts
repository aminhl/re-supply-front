import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../shared/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { AdminService } from "../../services/admin.service";
import Swal from 'sweetalert2';
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private authService: AuthService, private adminService: AdminService,private productService: ProductService) { }

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
    Swal.fire({
      title: 'Are you sure you want to delete this user?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteUser(userId).subscribe(() => {
          this.users = this.users.filter((user) => user._id !== userId);
          Swal.fire('User deleted', '', 'success');
        });
      }
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
