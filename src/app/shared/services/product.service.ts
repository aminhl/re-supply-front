import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, tap} from "rxjs";
import {environment as env} from "../../../environments/environment";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  wishlistUpdated = new Subject<any>();
  cartUpdated = new Subject<any>();


  constructor(public http: HttpClient,private router: Router) { }

  getAcceptedProducts(): Observable<any> {
    return this.http.get<any>(env.apiRoot + 'products/accepted');
  }
  addProduct(target: string, requestBody: FormData){
    return this.http.post(env.apiRoot + target, requestBody, {
      withCredentials: true,
    });
  }
  getAllProducts(): Observable<any> {
    return this.http.get<any>(env.apiRoot + 'products');
  }
  getProduct(id: string): Observable<any> {
    return this.http.get<any>(env.apiRoot + 'products/get/' + id);
  }
  // Get wishlist
  getWishlist(): Observable<any> {
    return this.http.get<any>(env.apiRoot + 'wishlists');
  }

  addProductToWishlist(productId: string): Observable<any> {
    return this.http.post<any>(`${env.apiRoot}wishlists/`, { productId })
      .pipe(
        tap(() => {
          // Emit the updated wishlist
          // @ts-ignore
          this.wishlistUpdated.next();
        })
      );
  }

  // Delete product from wishlist
  deleteProductFromWishlist(productId: string): Observable<any> {
    return this.http.delete(env.apiRoot + `wishlists/${productId}`);
  }
  // Get products by owner
  getProductsByOwner(): Observable<any> {
    return this.http.get<any>(env.apiRoot + 'products/owner-products', {
      withCredentials: true,
    });
  }

  getCart(): Observable<any> {
    return this.http.get<any>(env.apiRoot + 'carts');
  }

  addProductToCart(productId: string): Observable<any> {
    return this.http.post<any>(`${env.apiRoot}carts/`, { productId })
      .pipe(
        tap(() => {
          // Emit the updated wishlist
          // @ts-ignore
          this.cartUpdated.next();
        })
      );
  }

  // Delete product from wishlist
  deleteProductFromCart(productId: string): Observable<any> {
    return this.http.delete(env.apiRoot + `carts/${productId}`);
  }

  createOrder(requestBody: any): Observable<any>{
    return this.http.post<any>(env.apiRoot + "orders", requestBody);
  }

}
