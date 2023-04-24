import { Component, OnInit } from '@angular/core';
import { ClaimsService } from "../../services/claims.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {
  claimForm!: FormGroup;
  title!: FormControl;
  message!: FormControl;

  constructor(private claimService: ClaimsService,private router: Router) {
    this.initform();
    this.createForm();
  }

  ngOnInit(): void {
  }

  initform(): void {
    this.title = new FormControl('', [Validators.required]);
    this.message = new FormControl('', [Validators.required]);
  }

  createForm(): void {
    this.claimForm = new FormGroup({
      title: this.title,
      message: this.message,
    });
  }

  onSubmit(): void {
    const title = this.claimForm.value.title;
    const message = this.claimForm.value.message;
    this.claimService.addFeedback('feedbacks', title, message).subscribe((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Feedback submitted successfully!',
        text: 'Thank you for helping us improve our platform.',
        confirmButtonText: 'OK',
      }).then(() => {
        this.claimForm.reset();
      });
    }
    );
  }
}
