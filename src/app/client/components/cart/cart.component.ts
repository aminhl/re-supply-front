import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../shared/services/auth.service";
import { ProductService } from "../../../shared/services/product.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any;

  constructor(private authService: AuthService, private productService: ProductService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.loadCart();
    }
  }

  loadCart() {
    this.productService.getCart().subscribe(
      res => {
        this.cart = res.data.cart.products;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteProductFromCart(productId: string) {
    Swal.fire({
      title: 'Are you sure you want to delete this product from the cart?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProductFromCart(productId).subscribe(
          res => {
            // Find the index of the deleted product in the wishlist array
            const index = this.cart.findIndex(product => product._id === productId);
            if (index !== -1) {
              // If the product is found, remove it from the wishlist array
              this.cart.splice(index, 1);
              Swal.fire({
                title: 'Success!',
                text: 'Product has been removed from your cart.',
                icon: 'success',
              });
              // Emit the updated wishlist
              // @ts-ignore
              this.productService.cartUpdated.next();
            }
          },
          error => {
            Swal.fire({
              title: 'Error!',
              text: 'Unable to remove product from cart.',
              icon: 'error',
            });
            console.log(error);
          }
        );
      }
    });
  }

  createOrder(product): any{
    return this.productService.createOrder({ "products" : [ { "product": product._id} ] })
      .subscribe(response => window.location.href = response.data.session_url)
  }
}
