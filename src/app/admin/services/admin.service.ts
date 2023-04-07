import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  users: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>(env.apiRoot + 'users').subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(userId: string) {
    this.http.delete(`users/delete/${userId}`).subscribe(() => {
      // Remove the deleted user from the list of users
      this.users = this.users.filter((user) => user._id !== userId);
    });
  }
}
