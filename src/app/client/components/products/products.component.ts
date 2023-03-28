import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any;
  productImageUrl!: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getProducts().subscribe((req)=>{
      this.products = req.data.products;
      console.log(this.products)
      if (this.products.images && this.products.images.length > 0) {
        this.productImageUrl = this.products.images[0];
      }
    });
  }

}
