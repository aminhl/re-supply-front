import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import { ProductService } from "../../../shared/services/product.service";

@Component({
  selector: 'app-main-c',
  templateUrl: './main-c.component.html',
  styleUrls: ['./main-c.component.css']
})
export class MainCComponent implements OnInit {
  verified: any;
  role: any;
   products: any;
   owner: any;
  productImageUrl!: string;

  constructor(private authService:AuthService,private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getAcceptedProducts().subscribe((req)=>{
      this.products = req.data.products;
      this.owner = req.data.owner;

      console.log(this.products)
      if (this.products.images && this.products.images.length > 0) {
        this.productImageUrl = this.products.images[0];
      }
    });
  }

  showUsers(){
    this.authService.getUsers(this.verified, this.role).subscribe(response => console.log(response));
  }

}
