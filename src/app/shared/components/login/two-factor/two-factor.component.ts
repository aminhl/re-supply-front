import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TwilioService } from 'src/app/shared/services/TwilioService/twilio.service';
import { TwoFactorService } from 'src/app/shared/services/TwoFactorAuthService/two-factor.service';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.css'],
})
export class TwoFactorComponent implements OnInit {
  phoneNumber!: string;
  verificationCode: FormControl = new FormControl();
  codeForm!: FormGroup;
  constructor(
    private twoFactorAuthService: TwoFactorService,
    private twilioService: TwilioService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  enable2FA() {
    this.twoFactorAuthService.enable2FA().subscribe(
      (res) => console.log(res),
      (err) => console.error(err)
    );
  }

  createForm(): void {
    this.codeForm = new FormGroup({
      verificationCode: this.verificationCode,
    });
  }

  onSubmit() {
    console.log(this.verificationCode.value)
    this.twilioService.verifyCodeV(this.verificationCode.value).subscribe(
      (res) => {
        console.log(res);
        // Check if verification was successful
        console.log('Verification successful!');
        // Navigate to the desired route
        this.router.navigate(['']);
      },
      (err) => console.error(err)
    );
  }
}
