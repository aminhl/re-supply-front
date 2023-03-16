import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment as env } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TwilioService {
  constructor(private http: HttpClient, private router: Router) {}

  sendVerificationCode() {
    return this.http.post(`${env.apiRoot}users/login`, { });
  }

  verifyCode(phonenumber: string, code: number) {
    return this.http.post(`${env.apiRoot}users/login`, { phonenumber, code });
  }

  verifyCodeV(target: any) {
    return this.http.post(`${env.apiRoot}users/login?code=` + target, {});
  }
  verifyCodeV1(param: any) {
    const body = { param: param };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${env.apiRoot}users/login`, body, {
      headers,
    });
  }
  verifyTwoFactorCode(code: string): Observable<any> {
    const body = { code };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${env.apiRoot}users/login`, body, {
      headers,
    });
  }
}
