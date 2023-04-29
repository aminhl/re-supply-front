import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {ProductService} from "../../../shared/services/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header-c',
  templateUrl: './header-c.component.html',
  styleUrls: ['./header-c.component.css']
})
export class HeaderCComponent implements OnInit {
  wishlistCount = 0;
  wishlist: any[] = [];
  wishlistSubscription: Subscription;
  cartCount = 0;
  cart: any[] = [];
  cartSubscription: Subscription;

  constructor(public authService: AuthService,private productService: ProductService) {

  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()){
      this.loadWishlist();
      this.loadCart();
      // Subscribe to the wishlistUpdated subject to update the wishlist count
      this.wishlistSubscription = this.productService.wishlistUpdated.subscribe(() => {
        this.loadWishlist();
      });
      this.cartSubscription = this.productService.cartUpdated.subscribe(() => {
        this.loadCart();
      });
    }
  }

  loadCart() {
    this.productService.getCart().subscribe(
      res => {
        this.cart = res.data.cart.products;
        this.cartCount = this.cart.length;
      },
      error => {
        console.log(error);
      }
    );
  }
  loadWishlist() {
    this.productService.getWishlist().subscribe(
      res => {
        this.wishlist = res.data.wishlist.products;
        this.wishlistCount = this.wishlist.length;
      },
      error => {
        console.log(error);
      }
    );
  }
}
