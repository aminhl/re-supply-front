import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestService} from '../../../../shared/services/request.service';
import {HttpClient} from '@angular/common/http';
import {regexValid} from "../../../../core/validators/signup.validator";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  requestForm!: FormGroup;
  type!: FormControl;
  targetValue!: FormControl;
  currentValue!: FormControl;
  notes!: FormControl;
  itemType!: FormControl;
  requestTitle!: FormControl;
  requestImage!: FormControl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private service: RequestService,
    private router :Router
  ) {
  }

  ngOnInit(): void {
    this.initform();
    this.createForm();
  }

  initform(): void {
    this.type = new FormControl('',[Validators.required] );
    this.targetValue = new FormControl('',[Validators.required, Validators.min(0)] );
    this.currentValue = new FormControl('',[Validators.min(0)] );
    this.notes = new FormControl('',[Validators.required]);
    this.itemType = new FormControl('',);
    this.requestTitle = new FormControl('',[Validators.required]);
    this.requestImage = new FormControl();
  }

  createForm(): void {
    this.requestForm = new FormGroup({
      type: this.type,
      targetValue: this.targetValue,
      currentValue: this.currentValue,
      notes: this.notes,
      itemType:this.itemType,
      requestTitle:this.requestTitle,
      requestImage: this.requestImage,
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('type', this.requestForm.value.type);
    formData.append('notes', this.requestForm.value.notes);
      this.requestForm.value.currentValue=0;
    formData.append('currentValue', this.requestForm.value.currentValue);
    formData.append('targetValue', this.requestForm.value.targetValue);
    formData.append('itemType', this.requestForm.value.itemType);
    formData.append('requestTitle', this.requestForm.value.requestTitle);
    const requestImage = this.requestForm.get('requestImage');
    if (requestImage && requestImage.value) {
      formData.append('requestImage', requestImage.value,requestImage.value.name);
    }
    this.service.addRequest(formData).subscribe((res) => {
      Swal.fire({
        icon: 'info',
        title: 'Request Under Review!',
        text: 'Thank you for using our service, we will review your request and get back to you soon',
        confirmButtonText: 'Ok',
      });
      this.router.navigate(['/donation']);
    });
  }


  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.requestImage.setValue(file);
    this.requestImage.markAsTouched();
  }


}
