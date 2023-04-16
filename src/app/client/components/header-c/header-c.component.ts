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

  constructor(public authService: AuthService,private productService: ProductService) {

  }

  ngOnInit(): void {
    this.loadWishlist();
    // Subscribe to the wishlistUpdated subject to update the wishlist count
    this.wishlistSubscription = this.productService.wishlistUpdated.subscribe(() => {
      this.loadWishlist();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the wishlistSubscription to prevent memory leaks
    this.wishlistSubscription.unsubscribe();
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
