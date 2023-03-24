import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-header-c',
  templateUrl: './header-c.component.html',
  styleUrls: ['./header-c.component.css']
})
export class HeaderCComponent implements OnInit {
 
  

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    
  }

}
