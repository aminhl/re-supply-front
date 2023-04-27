import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../shared/services/auth.service";
import { ProductService } from "../../../../shared/services/product.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { environment as env } from "../../../../../environments/environment";

@Component({
  selector: 'app-profile-products',
  templateUrl: './profile-products.component.html',
  styleUrls: ['./profile-products.component.css']
})
export class ProfileProductsComponent implements OnInit {
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
}
