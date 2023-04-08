import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';
import { type } from 'os';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  role: string;
  sevenDaysUsers: any;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  originalUsers: any;
  filteredUsers: any;
  searchTerm: String;
  inactiveUsers: any;
  users: any;
  verified?: any;

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    return this.authService.getUsers(this.verified, this.role).subscribe(
      (response: any) => {
        this.users = response.data.users;
        this.filteredUsers = this.users;
        console.log(this.users);
      },
      (error) => console.error(error)
    );
  }

  getUsersbyStatus(status: boolean) {
    this.verified = status;
    console.log(this.verified);
    this.getAllUsers();
  }

  getUserByRole(role: string) {
    this.role = role;
    console.log(this.role);
    this.getAllUsers();
  }

  getUsersByWeek() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    this.filteredUsers = this.users.filter(
      (user) => new Date(user.joinedAt) > oneWeekAgo
    );
    console.log('filteredUsers:', this.filteredUsers);
  }
  getUsersByMonth() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 30);
    this.filteredUsers = this.users.filter(
      (user) => new Date(user.joinedAt) > oneWeekAgo
    );
    console.log('filteredUsers:', this.filteredUsers);
  }
  getUsersByOneDay() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 1);
    this.filteredUsers = this.users.filter(
      (user) => new Date(user.joinedAt) > oneWeekAgo
    );
    console.log('filteredUsers:', this.filteredUsers);
  }
  

  onInputChange(event: any) {
    this.searchTerm = event.target.value;
    this.searchUsers();
  }

  searchUsers() {
    if (this.searchTerm) {
      console.log(this.searchTerm);
      this.filteredUsers = this.users.filter((user) => {
        return Object.values(user).some((value) => {
          if (typeof value === 'string' && value.includes('+')) {
            value = value.replace(/\D/g, ''); // remove all non-digit characters
            if (value.toString().includes(this.searchTerm.toString())) {
              return true;
            }
          } else if (typeof value === 'string' || value instanceof Date) {
            if (
              value
                .toString()
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase())
            ) {
              return true;
            }
          }
          return false;
        });
      });
      console.log(this.filteredUsers);
      this.cdr.detectChanges();
    } else {
      this.filteredUsers = this.users;
      this.cdr.detectChanges();
    }
  }

  deleteUser(userId: string) {
    this.http.delete(`${env.apiRoot}users/delete/${userId}`).subscribe(() => {
      this.users = this.users.filter((user) => user._id !== userId);
    });
  }
}
