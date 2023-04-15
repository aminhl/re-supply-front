import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../../environments/environment";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  users: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${env.apiRoot}users/delete/${userId}`);
  }
  upgradeToAdmin(userId: string): Observable<any> {
    return this.http.patch(`${env.apiRoot}users/upgrade/${userId}`, {});
  }

}
