import { Component, OnInit } from '@angular/core';
import { ClaimsService } from '../../services/claims.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import Sentiment from 'sentiment';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css'],
})
export class ClaimsComponent implements OnInit {
  claimForm!: FormGroup;
  title!: FormControl;
  message!: FormControl;
  sentiment = new Sentiment();

  constructor(
    private claimService: ClaimsService,
    private router: Router
  ) {
    this.initForm();
    this.createForm();
  }

  ngOnInit(): void {
  }

  initForm(): void {
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
    const emotion = this.sentiment.analyze(message);
    let category = '';

    if (emotion.score > 0) {
      category = 'positive';
    } else if (emotion.score < 0) {
      category = 'negative';
    } else {
      category = 'neutral';
    }

    this.claimService.addFeedback('feedbacks', title, message).subscribe(
      (res) => {
        let alertTitle = '';
        let alertText = '';

        if (category === 'positive') {
          alertTitle = 'Thank you for your positive feedback!';
          alertText = 'We are glad to hear that you are enjoying our platform.';
        } else if (category === 'negative') {
          alertTitle = 'We apologize for the inconvenience';
          alertText =
            'We are sorry that you had a bad experience. We will investigate and do our best to improve.';
        } else {
          alertTitle = 'Thank you for your feedback!';
          alertText =
            'We appreciate your effort to send us a feedback and will take it into consideration.';
        }

        Swal.fire({
          icon: category === 'positive' ? 'success' : 'error',
          title: alertTitle,
          text: alertText,
          confirmButtonText: 'OK',
        }).then(() => {
          this.claimForm.reset();
        });
      },
      (err: HttpErrorResponse) => {
        // handle error
      }
    );
  }
}
