import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { environment as env } from '../../../../environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  updateForm: FormGroup;
  user: any;
  userImageUrl!: string;
  twoFactorAuth!: Boolean;
  images!: FormControl;
  isDisabled: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.images = new FormControl('', [Validators.required]);

    this.updateForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: ['', Validators.email],
      images: this.images,
    });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((req) => {
      this.user = req.data.user;
      if (this.user.images.length > 0) {
        this.userImageUrl = this.user.images[0];
      }
      this.twoFactorAuth = this.user.twoFactorAuth;
    });
  }

  onSubmit(): void {
    const formData: FormData = new FormData();
    formData.append('firstName', this.updateForm.get('firstName')!.value);
    formData.append('lastName', this.updateForm.get('lastName')!.value);
    formData.append('phoneNumber', this.updateForm.get('phoneNumber')!.value);
    formData.append('email', this.updateForm.get('email')!.value);
    const images = this.updateForm.get('images');
    if (
      images &&
      images.valid &&
      images.value instanceof File &&
      images.value.type.startsWith('image/')
    ) {
      formData.append('images', images.value, images.value.name);
    }

    this.http
      .patch('http://localhost:3000/api/v1/users/update', formData)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['myProfile']);
      });
  }
  handleChange(e) {
    let isChecked = e.checked;
  }
  onTwoFactorAuthChange() {
    if (!this.twoFactorAuth) {
      this.http.post(`${env.apiRoot}users/enable2FA`, {}).subscribe(
        (response) => {
          console.log(response);
this.twoFactorAuth = true;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.http.post(`${env.apiRoot}users/disable2FA`, {}).subscribe(
        (response) => {
          console.log(response);
          this.twoFactorAuth = false;

        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.images.setValue(file);
    this.images.markAsTouched();
  }
}

