import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {RequestService} from "../../../../shared/services/request.service";
import {AuthService} from "../../../../shared/services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {emailExistsValidator, regexValid, validatePassword} from "../../../../core/validators/signup.validator";


@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {
  requestForm!: FormGroup;
  requester_id!: FormControl;
  type!: FormControl;
  targetValue!: FormControl;
  currentValue!: FormControl;
  requestImage!: FormControl;
  notes!: FormControl;


  constructor(
    private requestService: RequestService,
  ) {
    this.initForm();
    this.createForm();
  }

  ngOnInit(): void {}

  initForm(): void {

    this.type = new FormControl('', [
      Validators.required,
    ]);
    this.targetValue = new FormControl(

      Validators.required

    );
    this.currentValue = new FormControl();

    this.notes= new FormControl('',);

    this.requestImage = new FormControl(null, [Validators.required]);
  }

  createForm(): void {
    this.requestForm = new FormGroup(
      {
        requester_id: this.requester_id,
        type: this.type,
        targetValue: this.targetValue,
        currentValue: this.currentValue,
        requestImage: this.requestImage,
        notes:this.notes,
      }
    );
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('requester_id', this.requestForm.value.requester_id);
    formData.append('type', this.requestForm.value.type);
    formData.append('targetValue', this.requestForm.value.email);
    formData.append('currentValue', this.requestForm.value.phoneNumber.currentValue);
    formData.append('requestImage', this.requestForm.value.requestImage);
    formData.append('notes', this.requestForm.value.notes);
    const requestImage = this.requestForm.get('requestImage');
    if (requestImage && requestImage.valid) {
      formData.append('requestImage', requestImage.value, requestImage.value.name);
    }

    this.requestService
      .addRequest('requests/', formData)
      .subscribe();
  }



}
