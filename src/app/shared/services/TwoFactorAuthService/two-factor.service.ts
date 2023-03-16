import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment as env } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TwoFactorService {
  constructor(private http: HttpClient, private router: Router) {}
  enable2FA() {
    return this.http.post(`${env.apiRoot}/enable2FA`, {});
  }
}
