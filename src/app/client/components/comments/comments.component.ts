import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  @Output() commentSubmitted = new EventEmitter<string>();

  submitComment(event: KeyboardEvent) {
    console.log('submitComment() called');
    if (event.code === 'Enter') {
      const commentText = (event.target as HTMLInputElement).value.trim();
      if (commentText !== '') {
        this.commentSubmitted.emit(commentText);
        (event.target as HTMLInputElement).value = '';
      }
    }
  }
}
