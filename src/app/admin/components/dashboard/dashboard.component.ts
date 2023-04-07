import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../shared/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { AdminService } from "../../services/admin.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private adminService: AdminService) { }

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
    Swal.fire({
      title: 'Are you sure you want to delete this user?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteUser(userId).subscribe(() => {
          this.users = this.users.filter((user) => user._id !== userId);
          Swal.fire('User deleted', '', 'success');
        });
      }
    });
  }

}
