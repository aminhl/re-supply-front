import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../../shared/services/request.service";

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

  donationList: any = [];
  constructor(private  service: RequestService   ) { }

  ngOnInit(): void {
    this.service.getRequestList().subscribe( (res) => {
      this.donationList = res;
      this.getPercentage()
      console.log(this.donationList);
    } );

    }

getPercentage(){
    for(let d of this.donationList){
      d.percentage= ((d.currentValue/d.targetValue)*100).toFixed(1);
    }
}
}
