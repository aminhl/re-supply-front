import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import  {environment as env} from "../../../environments/environment";
import {User} from "../../core/models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  signup(target: string, requestBody: FormData){
    return this.http.post(env.apiRoot + target, requestBody, { withCredentials: true});
  }

  login(target: string, requestBody: { email: string, password: string}){
    return this.http.post(env.apiRoot + target, requestBody, { withCredentials: true})
  }

  checkEmail(email: string): any {
    const url = `${env.apiRoot}users/checkEmail`;
    return this.http.post<{ exists: boolean }>(url, { email });
  }
  forgetPassword(target: string,requestBody: { email: string}){
    return this.http.post(env.apiRoot + target, requestBody, { withCredentials: true})
  }
  ResetPasswordAfterSubmit(target: string,requestBody: {password : string,confirmPassword : string}){
    return this.http.patch(env.apiRoot+target,requestBody, { withCredentials: true})
  }
}
