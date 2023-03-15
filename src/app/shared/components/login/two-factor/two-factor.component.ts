import { Component, OnInit } from '@angular/core';
import { TwilioService } from 'src/app/shared/services/TwilioService/twilio.service';
import { TwoFactorService } from 'src/app/shared/services/TwoFactorAuthService/two-factor.service';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.css'],
})
export class TwoFactorComponent implements OnInit {
  phoneNumber!: string;
  verificationCode!: number;
  constructor(
    private twoFactorAuthService: TwoFactorService,
    private twilioService: TwilioService
  ) {}

  ngOnInit(): void {}
  enable2FA() {
    this.twoFactorAuthService.enable2FA().subscribe(
      (res) => console.log(res),
      (err) => console.error(err)
    );
  }
  onSubmit() {
    this.twilioService
      .verifyCode(this.phoneNumber, this.verificationCode)
      .subscribe(
        (res) => console.log(res),
        (err) => console.error(err)
      );
  }
}
