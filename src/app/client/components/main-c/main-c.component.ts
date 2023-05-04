import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {RequestService} from "../../../shared/services/request.service";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-main-c',
  templateUrl: './main-c.component.html',
  styleUrls: ['./main-c.component.css']
})
export class MainCComponent implements OnInit {
  verified: any;
  role: any;
  nbrOfRequests:number=0;
  scoresList1:any[] = [];
  recommanded :any=[];
   products: any;

  constructor(private authService:AuthService, private requestService: RequestService,private ProductService:ProductService) { }

  ngOnInit(): void {

    this.getRequestsNumber();

    this.authService.getUser().subscribe(
      res => {

        this.scoresList1 = res.data.user.scores;
        this.scoresList1=this.scoresList1.sort((a, b) => b.score - a.score);
        for (let i = 0; i < 4; i++) {
          this.requestService.getRequest(this.scoresList1[i].requestId).subscribe(
            res=>{
              if (res.requester_id != null) {
                this.recommanded.push(res)
              }
            }
          )
        }
        console.log(this.recommanded)
      }
    );

    //if(this.nbrOfRequests> this.scoresL) {
    ///this.doScoring()
    //}


    this.ProductService.getAcceptedProducts().subscribe((response)=>
    {
      this.products=response
    })


  }

  showUsers(){
    return this.authService.getUsers(this.verified, this.role).subscribe(response => console.log(response));
  }

 // getScoredRequest(){
 //  this.authService.getUser().subscribe(res=>{
 //     this.scoresList = res.data.user.scores;
 //   })
 // }


  getRequestsNumber(){
   this.requestService.getRequestList().subscribe(
      res=> {
       this.nbrOfRequests= res.length
      }
    )
  }
  doScoring(){
     this.requestService.doScore().subscribe(req=>{
      //console.log(req);
    })
  }

}
