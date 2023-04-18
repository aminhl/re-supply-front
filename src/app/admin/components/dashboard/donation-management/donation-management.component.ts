import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../../../shared/services/request.service";
import Swal from "sweetalert2";
import {environment as env} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-donation-management',
  templateUrl: './donation-management.component.html',
  styleUrls: ['./donation-management.component.css']
})
export class DonationManagementComponent implements OnInit {

  donations: any;

  constructor(private donationService: RequestService,
              private http: HttpClient,) {
  }

  ngOnInit(): void {
    this.getAllDonation();
    console.log(this.getAllDonation());
  }

  getAllDonation() {
    this.donationService.getRequestList().subscribe((res) => {
      this.donations = res;
    });
  }

  deleteRequest(id: any) {

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
          .delete(`http://localhost:3000/api/v1/requests/${id}`)
          .subscribe(() => {
            this.donations = this.donations.filter(
              (product) => product._id !== id
            );
            Swal.fire('Product deleted', '', 'success');
          });
      }
    });

  }

  acceptRequest(id: any) {
    const donation = this.donations.find((p: any) => p._id === id);
    if (donation.isApproved) {
      Swal.fire('Request already approved', '', 'warning');
      return;
    }
    Swal.fire({
      title: 'Are you sure you want to approve this request?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, accept it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .put(`http://localhost:3000/api/v1/requests/approve/${id}`, {})
          .subscribe(() => {
            this.getAllDonation();
            Swal.fire('Request Approved', '', 'success');
          });
      }
    });
  }
}
