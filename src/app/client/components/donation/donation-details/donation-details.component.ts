import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../../../shared/services/product.service";
import { RequestService } from "../../../../shared/services/request.service";

@Component({
  selector: 'app-donation-details',
  templateUrl: './donation-details.component.html',
  styleUrls: ['./donation-details.component.css']
})
export class DonationDetailsComponent implements OnInit {
  donation: any;
  donationImageUrl!: string;
  constructor(private route: ActivatedRoute, private requestService: RequestService) { }

  ngOnInit(): void {
    const donationId = this.route.snapshot.paramMap.get('id');
    this.requestService.getRequest(donationId).subscribe((req) => {
      this.donation = req;
      if (this.donation.requestImage && this.donation.requestImage.length > 0) {
        this.donationImageUrl = this.donation.requestImage[0];
      }
    });
  }

}
