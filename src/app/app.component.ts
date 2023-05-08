import { Component } from '@angular/core';
import { AuthService } from "./shared/services/auth.service";
import { FirbaseAuthService } from './shared/services/fireBase/fire-base-auth.service';
import { Router } from '@angular/router';
import { UsersService } from './shared/services/fireBase/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user$ = this.usersService.currentUserProfile$;
  constructor(
    public authService: AuthService,
    private firebaseAuth: FirbaseAuthService,
    private router: Router,
    private usersService: UsersService
  ) {}
  title = 'resupplyF';
}
