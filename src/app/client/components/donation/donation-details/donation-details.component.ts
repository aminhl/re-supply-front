import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../../../shared/services/product.service";
import { RequestService } from "../../../../shared/services/request.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-donation-details',
  templateUrl: './donation-details.component.html',
  styleUrls: ['./donation-details.component.css']
})
export class DonationDetailsComponent implements OnInit {
  donation: any;
  donationImageUrl!: string;
  donationAmount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
  ) { }

  ngOnInit(): void {
    const donationId = this.route.snapshot.paramMap.get('id');
    this.requestService.getRequest(donationId).subscribe((req) => {
      this.donation = req;
      if (this.donation.requestImage && this.donation.requestImage.length > 0) {
        this.donationImageUrl = this.donation.requestImage[0];
      }
    });
  }

  onSubmit(form: NgForm) {
    const requestBody = { amount: form.value.amount };
    const requestId = this.route.snapshot.paramMap.get('id');
    this.requestService.donateStripe(requestBody, requestId).subscribe(response => window.location.href = response.data.session_url);
  }

  onSliderChange(value: number) {
    this.donationAmount = value ;
  }
}
