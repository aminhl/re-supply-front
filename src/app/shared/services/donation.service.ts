import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import  { environment as env } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(private http: HttpClient) { }

  donateWithEthereum(requestId, requestBody: any): Observable<any>{
    return this.http.post(env.apiRoot + `donations/sendETH/${requestId}`, requestBody);
  }
}
