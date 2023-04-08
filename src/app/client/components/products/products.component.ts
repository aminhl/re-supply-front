import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {ProductService} from "../../../shared/services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any;
  productImageUrl!: string;
  owner: any;
  searchTerm = '';

  constructor(private productService: ProductService) { }

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

}
