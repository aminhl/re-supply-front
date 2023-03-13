import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-main-c',
  templateUrl: './main-c.component.html',
  styleUrls: ['./main-c.component.css']
})
export class MainCComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  showUsers(){
    this.authService.getUsers().subscribe(response => console.log(response));
  }

}
