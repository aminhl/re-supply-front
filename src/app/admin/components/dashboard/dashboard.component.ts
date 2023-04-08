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


  constructor(private authService: AuthService, private adminService: AdminService,private productService: ProductService,private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllProducts();

  }

  users: any;
  products: any;
  order: string = 'status';
  reverse: boolean = false;


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

  deleteProduct(productId: string) {
    Swal.fire({
      title: 'Are you sure you want to delete this product?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`${environment.apiRoot}products/${productId}`).subscribe(() => {
          this.products = this.products.filter((product) => product._id !== productId);
          Swal.fire('Product deleted', '', 'success');
        });
      }
    });
  }

  acceptProduct(productId: string) {
    const product = this.products.find((p: any) => p._id === productId);
    if (product.status === 'accepted') {
      Swal.fire('Product already accepted', '', 'warning');
      return;
    }
    Swal.fire({
      title: 'Are you sure you want to accept this product?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, accept it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.patch(`${environment.apiRoot}products/accept/${productId}`, {}).subscribe(() => {
          this.getAllProducts();
          Swal.fire('Product accepted', '', 'success');
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
  sort(column: string) {
    if (this.order === column) {
      this.reverse = !this.reverse;
    } else {
      this.order = column;
      this.reverse = false;
    }
  }
}
