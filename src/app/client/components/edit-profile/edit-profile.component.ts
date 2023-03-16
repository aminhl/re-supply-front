import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  updateForm: FormGroup;
  user:any;


  constructor(private authService: AuthService, private formBuilder: FormBuilder, private http: HttpClient) {
    this.updateForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: ['', Validators.email],
      images: ['']
    });
  }

  onSubmit(): void {
    const formData: FormData = new FormData();
    // @ts-ignore
    formData.append('firstName', this.updateForm.get('firstName').value);
    // @ts-ignore
    formData.append('lastName', this.updateForm.get('lastName').value);
    // @ts-ignore
    formData.append('phoneNumber', this.updateForm.get('phoneNumber').value);
    // @ts-ignore
    formData.append('email', this.updateForm.get('email').value);
    // @ts-ignore
    formData.append('images', this.updateForm.get('images').value);

    this.http.patch('http://localhost:3000/api/v1/users/update', formData).subscribe(response => {
      console.log(response);
      // handle response
    });
  }

  ngOnInit(): void {
    // this.authService.getUsers().subscribe(res => console.log(res))
    this.authService.getUser().subscribe((req)=>{this.user=req.data.user; console.log(this.user)});
  }
}
