import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../../../shared/services/request.service";

@Component({
  selector: 'app-donation-management',
  templateUrl: './donation-management.component.html',
  styleUrls: ['./donation-management.component.css']
})
export class DonationManagementComponent implements OnInit {

  donations: any;

  constructor(private donationService: RequestService,) { }

  ngOnInit(): void {
    this.getAllDonation();
  }

  getAllDonation(){
    this.donationService.getRequestList().subscribe((res) => {
      this.donations = res;
    });
  }

}
