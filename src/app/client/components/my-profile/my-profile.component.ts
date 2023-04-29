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
  selectedComponent:string="MyProfile";


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
}
