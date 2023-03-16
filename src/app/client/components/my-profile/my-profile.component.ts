import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user:any;
  userImage!: string;

  active!: boolean;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
   // this.authService.getUsers().subscribe(res => console.log(res))
    this.authService.getUser().subscribe((req)=>{

      this.user=req.data.user;
      this.userImage = '../../../../assets/client/images/' +this.user.images[0].split('/')[3];
      this.active = req.data.user.verified;

    });
  }

}
