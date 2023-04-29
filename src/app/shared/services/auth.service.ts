import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { User } from '../../core/models/User';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import {
  catchError,
  finalize,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token!: string;
  errorMessage!: string;
  email!: string;
  password!: string;

  constructor(
    public http: HttpClient,
    private router: Router,
    private injector: Injector
  ) {}

  signup(target: string, requestBody: FormData) {
    return this.http.post(env.apiRoot + target, requestBody, {
      withCredentials: true,
    });
  }
  login(
    target: string,
    requestBody: {
      email: string | null;
      password: string | null;
      code?: number;
    }
  ) {
    return (
      this.http.post(env.apiRoot + target, requestBody, {
      withCredentials: true,
    }
    ))
  }

  checkEmail(email: string): any {
    const url = `${env.apiRoot}users/checkEmail`;
    return this.http.post<{ exists: boolean }>(url, { email });
  }



  getUsers(status:any, role : any) {
    let params = new HttpParams();
    if (status !== undefined ) {
      params = params.append('verified', status);
    }
    if (role !== undefined ) {
      params = params.append('role', role);
    }
    return this.http.get(env.apiRoot + 'users', { params: params });
  }


  getUser(): Observable<any> {
    return this.http.get<any>(env.apiRoot + 'users/user');
  }


  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  getConnectedUserData() {
    if (localStorage.getItem('jwt') !== null) {
      let token = localStorage.getItem('jwt');
      const payload = token?.split('.')[1];
      // @ts-ignore
      const decodedPayload: any = atob(payload);
      return JSON.parse(decodedPayload);
    }
  }

  checkEmailVerification() {
    const user = this.getConnectedUserData();
    if (user) {
      return this.http.get<{ status: string; verified: boolean }>(
        `/api/users/email-verification/${user.id}`
      );
    }
    return null;
  }

  haveAccess() {
    let token = localStorage.getItem('jwt');
    const payload = token?.split('.')[1];
    // @ts-ignore
    const decodedPayload: any = JSON.parse(atob(payload));
    if (decodedPayload.role === 'admin') return true;
    else {
      this.showNotAuthorizedAlert();
      return false;
    }
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
  forgetPassword(target: string, requestBody: { email: string }) {
    return this.http.post(env.apiRoot + target, requestBody, {
      withCredentials: true,
    });
  }
  ResetPasswordAfterSubmit(
    target: string,
    requestBody: { password: string; confirmPassword: string }
  ) {
    return this.http.patch(env.apiRoot + target, requestBody, {
      withCredentials: true,
    });
  }

  passportOAuth2(target: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    });
    return this.http.get(env.apiRoot + target, { headers });
  }

  /*
  verifyEmail(token: string): Observable<any> {
    return this.http.get(`/users/verifyEmail/${token}`);
  }*/

  verifyemail(target: string, requestBody: string) {
    return this.http.get(env.apiRoot + target);
  }

  updatePassword(target: string, requestBody: string) {
    return this.http.patch(env.apiRoot + target, requestBody);
  }

  showNotAuthorizedAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Not Authorized',
      text: 'Sorry, you are not authorized to access this page',
      confirmButtonText: 'Ok',
    });
  }

  deleteAccount(): any{
    return this.http.delete(env.apiRoot + "users/deactivateAccount");
  }

  getUsersnoadmin(status:any, role : any) {
    let params = new HttpParams();
    if (status !== undefined ) {
      params = params.append('verified', status);
    }
    if (role !== undefined ) {
      params = params.append('role', role);
    }
    return this.http.get(env.apiRoot + 'getAllUsersNoadmin', { params: params });
  }
  sendemail(target: string,url:string,email:string) {
    const requestBody = {
      url,
      email
    };
    return this.http.post(env.apiRoot + target,requestBody);
  }
}
