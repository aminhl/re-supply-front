import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../../../../shared/services/request.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {
  requestForm!: FormGroup;
  submitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private service: RequestService
  ) {}

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      type: ['', Validators.required],
      targetValue: [null, Validators.required],
      currentValue: [null],
      notes: [''],
      requestImage: [null]
    });
  }

  onSubmit() {
    this.submitting = true;
    const formData = new FormData();
    formData.append('type', this.requestForm.value.type);
    formData.append('targetValue', this.requestForm.value.targetValue);
    formData.append('currentValue', this.requestForm.value.currentValue);
    formData.append('notes', this.requestForm.value.notes);
    if (this.requestForm.value.requestImage) {
      formData.append('requestImage', this.requestForm.value.requestImage[0]);
    }
    this.service.addRequest(formData).subscribe((res) => {
      this.submitting = false;
      console.log(res);
    });
  }
}
