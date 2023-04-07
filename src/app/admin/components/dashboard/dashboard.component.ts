import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../shared/services/auth.service";
import { AdminService } from "../../services/admin.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  users: any;

  getAllUsers(){
    return this.authService.getUsers().subscribe((response: any) => {
      this.users = response.data.users;
    })
  }

  deleteUser(userId: string) {
    this.http.delete(`${environment.apiRoot}users/delete/${userId}`).subscribe(() => {
      this.users = this.users.filter((user) => user._id !== userId);
    });
  }

}
