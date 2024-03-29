import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AuthService } from "../../../shared/services/auth.service";
import { ProductService } from "../../../shared/services/product.service";
import { filter, Subscription } from "rxjs";
import { ScheduleMeetingService } from "../../../shared/services/KnowledgeService/schedule-meeting.service";
import { NavigationEnd, Router } from "@angular/router";
import Web3 from "web3";

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


  constructor(public authService: AuthService,private productService: ProductService,
              private cdr: ChangeDetectorRef, private router: Router
    ,private schedulerservice: ScheduleMeetingService
  ) {

  }


  ngOnInit(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
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
      this.cdr.detectChanges();
    });
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

  isWalletConnected(){
    return this.authService.isWalletConnected();
  }

  connectToWeb3(){
    return this.authService.connectToWeb3();
  }

}
