import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestService} from '../../../../shared/services/request.service';
import {HttpClient} from '@angular/common/http';
import {regexValid} from "../../../../core/validators/signup.validator";
import {Router} from "@angular/router";

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
    this.targetValue = new FormControl('',[Validators.min(0)] );
    this.currentValue = new FormControl('',[Validators.min(0)] );
    this.notes = new FormControl('',[Validators.required]);
    this.requestImage = new FormControl();
  }

  createForm(): void {
    this.requestForm = new FormGroup({
      type: this.type,
      targetValue: this.targetValue,
      currentValue: this.currentValue,
      notes: this.notes,
      requestImage: this.requestImage,
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('type', this.requestForm.value.type);
    formData.append('targetValue', this.requestForm.value.targetValue);
    formData.append('currentValue', this.requestForm.value.currentValue);
    formData.append('notes', this.requestForm.value.notes);
    const requestImage = this.requestForm.get('requestImage');
    if (requestImage && requestImage.value) {
      formData.append('requestImage', requestImage.value,requestImage.value.name);
    }
    this.service.addRequest(formData).subscribe((res) => {
      this.router.navigate(['/donation']);
    });
  }


  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.requestImage.setValue(file);
    this.requestImage.markAsTouched();
  }





}
