import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RequestService } from "../../../../shared/services/request.service";
import { FormControl, NgForm } from "@angular/forms";
import { DonationService } from "../../../../shared/services/donation.service";
import { AuthService } from "../../../../shared/services/auth.service";
import axios from "axios";
import Swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-donation-details',
  templateUrl: './donation-details.component.html',
  styleUrls: ['./donation-details.component.css']
})
export class DonationDetailsComponent implements OnInit {
  donation: any;
  donationImageUrl!: string;
  donationAmount: number = 0;
  constructor(private route: ActivatedRoute,
              private requestService: RequestService,
              private donationService: DonationService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    const donationId = this.route.snapshot.paramMap.get('id');
    this.requestService.getRequest(donationId).subscribe((req) => {
      this.donation = req;
      if (this.donation.requestImage && this.donation.requestImage.length > 0) {
        this.donationImageUrl = this.donation.requestImage[0];
      }
    });
  }

  // @ts-ignore
  donateWithEthereum = async (requestId: string, toAddress?: string, usdAmount?: number) => {
    const loggedUserData = this.authService.getConnectedUserData();
    try {
      const response = await axios
        .get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const ethPrice = response.data.ethereum.usd;
      const ethAmount = usdAmount / ethPrice;
      return this.donationService.donateWithEthereum(requestId,{
        fromAddress: loggedUserData.walletEth.address,
        toAddress: toAddress,
        privateKey: "0x70f34ac1d4d3e5fb97bc9326ed13533d975901130806664796196eeecbde036d",
        amount: ethAmount.toFixed(8) // Specify 8 decimal places for ETH amount
      }).subscribe((data) => {
        const transactionHash = data.hash
        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: 'Payment Successful',
            text: 'Thank you for your payment!\n Transaction Hash: ' + transactionHash,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
        }, 2000)
      },
        (error: HttpErrorResponse) => {
          if (error.status === 500) {
            // Handle the error here
            Swal.fire({
              icon: 'error',
              title: 'Payment Error',
              text: 'No enough funds in your wallet',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  onSubmit(form: NgForm) {
    const requestBody = { amount: form.value.amount };
    const requestId = this.route.snapshot.paramMap.get('id');
    this.requestService.donateStripe(requestBody, requestId).subscribe(response => window.location.href = response.data.session_url);
  }

  onSliderChange(value: number) {
    this.donationAmount = value ;
  }

}
