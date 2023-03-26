import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../../../shared/services/request.service";
import {HttpClient} from "@angular/common/http";
import {log} from "util";

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {
  request: any = {};
  submitting: boolean = false;

  constructor(private http: HttpClient,private service : RequestService) { }

  ngOnInit(): void {
  }


  onSubmit() {
    this.submitting = true;
    const formData = new FormData();
    formData.append('type', this.request.type);
    formData.append('targetValue', this.request.targetValue);
    formData.append('currentValue', this.request.currentValue);
    formData.append('notes', this.request.notes);
    for (let i = 0; i < this.request.requestImage.length; i++) {
      formData.append('requestImage', this.request.requestImage[i]);
    }
    this.service.addRequest("requests",formData).subscribe(value => console.log(value))

  }



}
