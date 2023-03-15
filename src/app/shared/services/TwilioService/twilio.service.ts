import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment as env} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TwilioService {

  constructor(private http: HttpClient, private router: Router) { }

  sendVerificationCode(phoneNumber: string) {
    return this.http.post(`${env.apiRoot}/login`, { phoneNumber });
  }

  verifyCode(phoneNumber: string, code: number) {
    return this.http.post(`${env.apiRoot}/login`, { phoneNumber, code });
  }
}
