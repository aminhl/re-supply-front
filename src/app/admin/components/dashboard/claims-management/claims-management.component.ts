import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../shared/services/auth.service";
import {ClaimsService} from "../../../../shared/services/claims.service";



@Component({
  selector: 'app-claims-management',
  templateUrl: './claims-management.component.html',
  styleUrls: ['./claims-management.component.css']
})
export class ClaimsManagementComponent implements OnInit {

  feedbacks: any[];
  currentPage = 1;

  constructor(private authService: AuthService, private claimsService: ClaimsService) { }

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks() {
    this.claimsService.getAllFeedbacks().subscribe(
      (response: any) => {
        this.feedbacks = response.data.feedbacks;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getPositiveFeedbacks() {
    this.claimsService.getPositiveFeedbacks().subscribe(
      (response: any) => {
        this.feedbacks = response.data.feedbacks;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getNegativeFeedbacks() {
    this.claimsService.getNegativeFeedbacks().subscribe(
      (response: any) => {
        this.feedbacks = response.data.feedbacks;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}

