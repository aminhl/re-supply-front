import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RequestService } from "../../../../shared/services/request.service";
import { FormControl, NgForm, Validators } from "@angular/forms";
import { DonationService } from "../../../../shared/services/donation.service";
import { AuthService } from "../../../../shared/services/auth.service";
import Swal from "sweetalert2";
import Web3 from "web3";

@Component({
  selector: 'app-donation-details',
  templateUrl: './donation-details.component.html',
  styleUrls: ['./donation-details.component.css']
})
export class DonationDetailsComponent implements OnInit {
  donation: any;
  donationImageUrl!: string;
  donationAmount: number = 0;
  donationValue: FormControl;


  constructor(private route: ActivatedRoute,
              private requestService: RequestService,
              private donationService: DonationService,
              private authService: AuthService) {
    this.donationValue = new FormControl('', Validators.required);
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

  onSubmit(form: NgForm) {
    const requestBody = { amount: this.donationValue.value };
    const requestId = this.route.snapshot.paramMap.get('id');
    this.requestService.donateStripe(requestBody, requestId).subscribe(response => window.location.href = response.data.session_url);
  }

  onSliderChange(value: number) {
    this.donationAmount = value ;
  }

  amountChecker: boolean = true;
  isSubmitted = false;

  async sendEthereum(requestId: string, toAddress: string, amountToSendUSD) {
    if (this.donationValue.value){
      this.isSubmitted = true;
      // Initialize Web3 instance
      // @ts-ignore
      const web3 = new Web3(window.ethereum);

      // Check if user has authorized access to their accounts
      const accounts = await web3.eth.getAccounts();

      if (accounts.length === 0) {
        Swal.fire({
          title: 'Connect Wallet',
          text: 'Please connect your wallet to continue.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }

      const loggedUserData = this.authService.getConnectedUserData();
      // Set default account to sender's account
      web3.eth.defaultAccount = loggedUserData.walletEth.address;

      // Get current exchange rate of USD to Ethereum
      const exchangeRateResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const exchangeRateData = await exchangeRateResponse.json();
      const exchangeRate = exchangeRateData.ethereum.usd;

      // Calculate equivalent amount in Ethereum
      const amountInEthereum = amountToSendUSD / exchangeRate;
      const amountInWei = web3.utils.toWei(amountInEthereum.toFixed(18), 'ether');

      // Define transaction parameters
      const gasPrice = web3.utils.toWei('5', 'gwei');
      const gasLimit = 21000;

      // Create transaction object
      const txObject = {
        from: loggedUserData.walletEth.address,
        to: toAddress,
        value: amountInWei,
        gasPrice: gasPrice,
        gas: gasLimit,
      };

      // Send transaction
      try {
        const transactionHash = await web3.eth.sendTransaction(txObject);
        this.donationService.updateDonationRequest(requestId, { amount: amountInEthereum })
          .subscribe((response) => { console.log(response)})
        console.log(`Transaction hash: ${transactionHash}`);
      } catch (error) {
        console.error(`Transaction error: ${error}`);
      }
    }
  }

}
