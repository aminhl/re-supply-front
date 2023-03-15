import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth.service";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  isVerified = false;

  constructor(public authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

  }

}
