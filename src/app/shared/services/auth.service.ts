import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../environments/environment";
import {User} from "../../core/models/User";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

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


  getUsers() {
    return this.http.get(env.apiRoot + "users");
  }


  getUser(): Observable<any> {
    return this.http.get<any>(env.apiRoot + "users/user");
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getToken(): string | null {
    return localStorage.getItem("jwt");
  }

  getConnectedUserData(){
    if(localStorage.getItem("jwt") !== null){
      let token = localStorage.getItem("jwt");
      const payload = token?.split('.')[1];
      // @ts-ignore
      const decodedPayload: any = atob(payload);
      return JSON.parse(decodedPayload);
    }
  }

  checkEmailVerification() {
    const user = this.getConnectedUserData();
    if (user) {
      return this.http.get<{ status: string; verified: boolean }>(`/api/users/email-verification/${user.id}`);
    }
    return null;
  }

  haveAccess(){
    let token = localStorage.getItem("jwt");
    const payload = token?.split('.')[1];
    // @ts-ignore
    const decodedPayload: any = JSON.parse(atob(payload));
    if (decodedPayload.role === "admin") return true;
    else {
      alert("You don't have access!!")
      return false;
    }
  }

  logout(){
    localStorage.removeItem("jwt");
    this.router.navigate(['/login']);
  }
  forgetPassword(target: string,requestBody: { email: string}){
    return this.http.post(env.apiRoot + target, requestBody, { withCredentials: true})
  }
  ResetPasswordAfterSubmit(target: string,requestBody: {password : string,confirmPassword : string}){
    return this.http.patch(env.apiRoot+target,requestBody, { withCredentials: true})
}
/*
  verifyEmail(token: string): Observable<any> {
    return this.http.get(`/users/verifyEmail/${token}`);
  }*/
  
  verifyemail(target: string,requestBody: string){
    return this.http.get(env.apiRoot+target)
}
}
