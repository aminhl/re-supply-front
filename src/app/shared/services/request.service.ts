import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment as env} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = 'http://localhost:3000/api/v1/requests';

  constructor(private http: HttpClient) { }


addRequest(data: FormData): Observable<any> {
    console.log("in service ")
    return this.http.post(`${this.baseUrl}`, data,{
      withCredentials: true,
  });
  }
  getRequestList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  getRequest(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/v1/users/${id}`);
  }
  deleteRequest(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  modifyRequest(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
  donateStripe(requestBody: any, requestId: any): Observable<any> {
    return this.http.post<any>(`${env.apiRoot}orders/donate/${requestId}`, requestBody);
  }
  doScore(): Observable<any> {
    return this.http.post<any>("http://localhost:3000/api/v1/users/doScore",null);
  }
}
