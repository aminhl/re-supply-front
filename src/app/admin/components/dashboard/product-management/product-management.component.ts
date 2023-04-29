import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/services/auth.service";
import {AdminService} from "../../../services/admin.service";
import {ProductService} from "../../../../shared/services/product.service";
import {RequestService} from "../../../../shared/services/request.service";
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";
import {environment as env} from "../../../../../environments/environment";

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  role: String;

  filteredUsers: any;
  users: any;
  verified: Boolean;
  products: any;
  order: string = 'status';
  reverse: boolean = false;
  currentPage = 1;
  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private productService: ProductService,
    private donationService: RequestService,
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


}
