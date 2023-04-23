import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {ProductService} from "../../../shared/services/product.service";
import Swal from "sweetalert2";
import { environment as env } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user:any;
  userImageUrl!: string;
  active!: boolean;
  products: any;
  productImageUrl!: string;
  owner: any;


  constructor(private authService: AuthService, private productService: ProductService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((req)=>{

      this.user = req.data.user;
      if (this.user.images.length > 0) {
        this.userImageUrl = this.user.images[0];
      }
      this.active = req.data.user.verified;
    });
    this.productService.getProductsByOwner().subscribe((req)=>{
      this.products = req.data.products;
      this.owner = req.data.owner;
      if (this.products.images && this.products.images.length > 0) {
        this.productImageUrl = this.products.images[0];
      }
    });
  }
  getPhoneNumber(user: any) {
    if (user.phoneNumber === '00000000') {
      return 'Not provided';
    }
    return user.phoneNumber;
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

  deleteAccount(): any{
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete your account without verification.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteAccount().subscribe(res => console.log(res));
        localStorage.removeItem("jwt");
        this.router.navigate(['/login'])
      }
    })
  }

}
