import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {ProductService} from "../../../shared/services/product.service";
import {ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";

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
  selectedFilter = 'name'; // default selected filter option
  selectedOrder = 'asc'; // default selected order
  wishlist: any;


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
  sortProducts() {
    this.products.sort((a: any, b: any) => {
      let comparison = 0;
      switch (this.selectedFilter) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'date':
          comparison = new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
          break;
      }
      return this.selectedOrder === 'asc' ? comparison : -comparison;
    });
  }

  addProductToWishlist(product: any) {
    this.productService.addProductToWishlist(product._id).subscribe(
      res => {
        this.wishlist = res.data.wishlist;
        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: 'Product added to the wishList!',
            showConfirmButton: false,
            timer: 2000
          });
        }, 1000);
      },
      error => {
        if (error.status === 400 && error.error.message === 'Product already in wishlist') {
          Swal.fire({
            icon: 'warning',
            title: 'Product already in wishlist',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          console.log(error);
        }
      }
    );
  }




}
