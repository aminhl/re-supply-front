import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {environment as env} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http: HttpClient,private router: Router) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(env.apiRoot + 'products');
  }
  addProduct(target: string, requestBody: FormData){
    return this.http.post(env.apiRoot + target, requestBody, {
      withCredentials: true,
    });
  }
  getOwnerDetails(id: string): Observable<any> {
    return this.http.get<any>(`${env.apiRoot}products/ownerDetails/${id}`, {
      withCredentials: true,
    });
  }


}
