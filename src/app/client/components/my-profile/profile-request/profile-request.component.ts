import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../shared/services/auth.service";
import {ProductService} from "../../../../shared/services/product.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {environment as env} from "../../../../../environments/environment";
import {RequestService} from "../../../../shared/services/request.service";

@Component({
  selector: 'app-profile-request',
  templateUrl: './profile-request.component.html',
  styleUrls: ['./profile-request.component.css']
})
export class ProfileRequestComponent implements OnInit {

  user:any;
  userImageUrl!: string;
  active!: boolean;
  requests: any;
  requestImageUrl!: string;
  owner: any;



  constructor(private authService: AuthService, private requestService: RequestService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((req)=>{

      this.user = req.data.user;
      if (this.user.images.length > 0) {
        this.userImageUrl = this.user.images[0];
      }
      this.active = req.data.user.verified;
    });
    this.requestService.getRequestByOwner().subscribe((req)=>{
      this.requests = req.data.requests;
      this.owner = req.data.owner;
      if (this.requests.images && this.requests.images.length > 0) {
        this.requestImageUrl = this.requests.images[0];
      }
    });
  }


  deleteRequest(_id: any) {
    Swal.fire({
      title: 'Are you sure you want to delete this Request?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(`${env.apiRoot}requests/${_id}`)
          .subscribe(() => {
            this.requests = this.requests.filter(
              (product) => product._id !== _id
            );
            Swal.fire('Request deleted', '', 'success');
          });
      }
    });
  }
}
