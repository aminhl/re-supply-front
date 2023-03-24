import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth.service";
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  isVerified !:boolean;
  token !:any;
  notAllowed !:boolean;
  constructor(private authService: AuthService, private router: Router,private route: ActivatedRoute) { 
    this.notAllowed=false
    this.isVerified=false
    this.route.queryParams.subscribe((queryParam)=>
    {this.token=queryParam;})
    if (this.token.id==null) {
      this.notAllowed=true;
    }
    else{
      this.notAllowed=false;
    }
  }
  

  ngOnInit(): void {
    if (this.notAllowed) 
    {
    this.router.navigate(["/login"])
    }
    else 
    {
      this.Verif();
    }
    
}
Verif()
{
  this.isVerified=true
  setTimeout(() => {
    this.authService.verifyemail("users/verifyEmail/"+this.token.id,"").subscribe(
      data => {
        this.router.navigateByUrl('/login');
      }
    )
  }, 2000);
 
}

gotologin()
{
  this.router.navigate(["/login"])
}
}
