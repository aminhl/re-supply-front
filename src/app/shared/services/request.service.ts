import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment as env} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = 'http://localhost:3000/api/requests';

  constructor(private http: HttpClient) { }


  addRequest(target: string, requestBody: FormData) {
    return this.http.post(env.apiRoot + target, requestBody, {
      withCredentials: true,
    });
  }
}
