import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../../shared/services/product.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: any;
  productImageUrl!: string;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(productId).subscribe((req) => {
      this.product = req.data.product;
      console.log(this.product)
      if (this.product.images && this.product.images.length > 0) {
        this.productImageUrl = this.product.images[0];
      }
    });
  }
  createSingleOrder(productId: string): void {
    this.productService.createSingleOrder(productId)
      .subscribe(response => window.location.href = response.data.session_url);
  }
}
