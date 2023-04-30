import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../shared/services/auth.service";
import { ProductService } from "../../../../shared/services/product.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { environment as env } from "../../../../../environments/environment";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  user:any;
  userImageUrl!: string;
  active!: boolean;
  products: any;
  productImageUrl!: string;
  owner: any;
  selectedComponent = 'MyProfile';


  constructor(private authService: AuthService, private productService: ProductService) { }

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


}
