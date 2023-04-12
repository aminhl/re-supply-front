
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';
import { type } from 'os';
import { catchError, EMPTY, tap } from 'rxjs';
import { AdminService } from "../../services/admin.service";
import Swal from 'sweetalert2';
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  role: String;
  sevenDaysUsers: any;
  originalUsers: any;
  filteredUsers: any;
  searchTerm: String;
  inactiveUsers: any;
  users: any;
  verified: Boolean;
  products: any;
  order: string = 'status';
  reverse: boolean = false;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private productService: ProductService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllProducts();
  }

  getAllUsers() {
    return this.authService.getUsers(this.verified, this.role).subscribe(
      (response: any) => {
        this.users = response.data.users;
        this.filteredUsers = this.users;
        console.log(this.users);
      },
      (error) => console.error(error)
    );
  }

  getUsersbyStatus(status: boolean) {
    this.verified = status;
    console.log(this.verified);
    this.getAllUsers();
    this.verified = undefined;
  }

  getUserByRole(role: string) {
    this.role = role;
    console.log(this.role);
    this.getAllUsers();
    this.role = undefined;
  }

  getUsersByWeek() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    this.filteredUsers = this.users.filter(
      (user) => new Date(user.joinedAt) > oneWeekAgo
    );
    console.log('filteredUsers:', this.filteredUsers);
  }
  getUsersByMonth() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 30);
    this.filteredUsers = this.users.filter(
      (user) => new Date(user.joinedAt) > oneWeekAgo
    );
    console.log('filteredUsers:', this.filteredUsers);
  }
  getUsersByOneDay() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 1);
    this.filteredUsers = this.users.filter(
      (user) => new Date(user.joinedAt) > oneWeekAgo
    );
    console.log('filteredUsers:', this.filteredUsers);
  }

  onInputChange(event: any) {
    this.searchTerm = event.target.value;
    this.searchUsers();
  }

  searchUsers() {
    if (this.searchTerm) {
      console.log(this.searchTerm);
      this.filteredUsers = this.users.filter((user) => {
        return Object.values(user).some((value) => {
          if (typeof value === 'string' && value.includes('+')) {
            value = value.replace(/\D/g, ''); // remove all non-digit characters
            if (value.toString().includes(this.searchTerm.toString())) {
              return true;
            }
          } else if (typeof value === 'string' || value instanceof Date) {
            if (
              value
                .toString()
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase())
            ) {
              return true;
            }
          }
          return false;
        });
      });
      console.log(this.filteredUsers);
      this.cdr.detectChanges();
    } else {
      this.filteredUsers = this.users;
      this.cdr.detectChanges();
    }
  }

  deleteUser(userId: string) {
    Swal.fire({
      title: 'Are you sure you want to delete this user?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteUser(userId).subscribe(() => {
          this.users = this.users.filter((user) => user._id !== userId);
          this.getAllUsers();
          Swal.fire('User deleted', '', 'success');
        });
      }
    });
  }

  upgradeToAdmin(userId: string) {
    const user = this.users.find((u: any) => u._id === userId);
    if (user.role === 'admin') {
      Swal.fire('User is already an admin', '', 'info');
      return;
    }
    Swal.fire({
      title: 'Are you sure you want to upgrade this user to admin?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, upgrade!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.upgradeToAdmin(userId).subscribe(() => {
          this.users = this.users.filter((user) => user._id !== userId);
          this.getAllUsers();
          Swal.fire('User upgraded to admin', '', 'success');
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
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(`${env.apiRoot}products/${productId}`)
          .subscribe(() => {
            this.products = this.products.filter(
              (product) => product._id !== productId
            );
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
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .patch(`${env.apiRoot}products/accept/${productId}`, {})
          .subscribe(() => {
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
  getPhoneNumber(user: any) {
    if (user.phoneNumber === '00000000') {
      return 'Not provided';
    }
    return user.phoneNumber;
  }
}


