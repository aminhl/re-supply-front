import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {environment as env} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  constructor(public http: HttpClient) { }

  addFeedback(target: string, title: string, message: string) {
    const requestBody = {
      title,
      message
    };
    return this.http.post(env.apiRoot + target, requestBody, {
      withCredentials: true,
    });
  }

  getAllFeedbacks(): Observable<any> {
    return this.http.get<any>(env.apiRoot + 'feedbacks', {  withCredentials: true,});
  }

}
