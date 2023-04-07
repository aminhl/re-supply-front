import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  users: any;

  getAllUsers(){
    return this.authService.getUsers().subscribe((response: any) => {
      this.users = response.data.users;
    })
  }

}
