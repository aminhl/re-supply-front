import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist: any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist() {
    this.productService.getWishlist().subscribe(
      res => {
        this.wishlist = res.data.wishlist.products;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteProductFromWishlist(productId: string) {
    Swal.fire({
      title: 'Are you sure you want to remove this product from your wishlist?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProductFromWishlist(productId).subscribe(
          res => {
            // Find the index of the deleted product in the wishlist array
            const index = this.wishlist.findIndex(product => product._id === productId);
            if (index !== -1) {
              // If the product is found, remove it from the wishlist array
              this.wishlist.splice(index, 1);
              Swal.fire({
                title: 'Product removed from wishlist',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
              });
            }
          },
          error => {
            Swal.fire({
              title: 'Error',
              text: 'Unable to remove product from wishlist. Please try again later.',
              icon: 'error',
              showConfirmButton: false,
              timer: 1500
            });
            console.log(error);
          }
        );
      }
    });
  }


}
