import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-header-c',
  templateUrl: './header-c.component.html',
  styleUrls: ['./header-c.component.css']
})
export class HeaderCComponent implements OnInit {
  user:any;
  userImage!: string;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((req)=>{
      this.user=req.data.user; this.userImage = '../../../../assets/client/images/' +this.user.images[0].split('/')[3]
    });
  }

}
