import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user:any;
  userImageUrl!: string;

  active!: boolean;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((req)=>{
      this.user = req.data.user;
      if (this.user.images.length > 0) {
        this.userImageUrl = this.user.images[0];
      }
      this.active = req.data.user.verified;
    });
  }

}
