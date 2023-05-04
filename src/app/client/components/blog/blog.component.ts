import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  ConfirmEventType,
  MenuItem,
  MessageService,
} from 'primeng/api';
import { BlogService } from 'src/app/shared/services/blogService/blog.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentsService } from 'src/app/shared/services/commentsService/comments.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  @ViewChild('myForm') formRef: ElementRef;
  imageUrls: any[] = [];
  connectedUser: any;
  blogForm: FormGroup;
  commentsForm: FormGroup;
  content: FormControl;
  description: FormControl;
  title: FormControl;
  blogs: any[];
  comments: any[];
  displayMaximizable: boolean;
  items: MenuItem[];
  images: FormControl[];
  uploadedFiles: any[] = [];
  userId: any;
  commentsByArticle: any[];
  targetCount: number;
  isEditMode = false;
  chanches: number;

  hasProfanity(text: string): boolean {
    const profanityList = ['idiot', 'stupid', 'kill', 'dead'];

    for (let i = 0; i < profanityList.length; i++) {
      if (text.includes(profanityList[i])) {
        return true;
      }
    }
    return false;
  }

  attempts = parseInt(localStorage.getItem('attempts')) || 3;
  lastChance = parseInt(localStorage.getItem('lastChance')) || 2;

  onCommentInputChange(event: Event) {
    const commentInput = event.target as HTMLInputElement;
    const comment = commentInput.value;

    if (this.hasProfanity(comment)) {
      this.attempts--;
      localStorage.setItem('attempts', this.attempts.toString());

      if (this.attempts > 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Bad Word Detected',
          text: `You still have ${this.attempts} attempts or we will have to kick you out.`,
        });
      } else {
        this.lastChance--;
        localStorage.setItem('lastChance', this.lastChance.toString());

        if (this.lastChance > 0) {
          Swal.fire({
            icon: 'warning',
            title: 'Bad Word Detected',
            text: `You have been logged out. You have ${this.lastChance} more chance(s).`,
          });
          this.attempts = 3;
          localStorage.setItem('attempts', this.attempts.toString());
          this.authService.logout();
        } else {

          localStorage.removeItem('attempts');
          localStorage.removeItem('lastChance');
          this.authService.deleteAccount().subscribe(() => {
             Swal.fire({
            icon: 'warning',
            title: 'Bad Word Detected',
            text: `You have been banned permanently.`,
          });
            this.authService.logout();
          });
        }
      }
    } else {
      // reset attempts and lastChance if there is no profanity in the comment
      this.attempts = 3;
      this.lastChance = parseInt(localStorage.getItem('lastChance') ?? '2');
      localStorage.setItem('attempts', this.attempts.toString());
      localStorage.setItem('lastChance', this.lastChance.toString());
    }
  }

  updateCommentsForm = this.formBuilder.group({
    content: '',
    id: '',
  });
  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private formBuilder: FormBuilder,
    private commentService: CommentsService,
    private changeDetectorRef: ChangeDetectorRef,
    public sanitizer: DomSanitizer,
    private ngZone: NgZone
  ) {
    this.createForm();
    this.createCommentForm();
    this.getBlogs();
  }
  ngOnInit() {
    this.authService.getUser().subscribe((res) => {
      this.connectedUser = res.data.user;
      console.log(this.connectedUser);
    });
    this.commentService.getComments().subscribe((res) => {
      this.comments = res['data']['comments'];
    });
  }

  getBlogs() {
    return this.blogService.getBlogs(this.userId).subscribe((res: any) => {
      try {
        this.blogs = res.data.articles;
        if (this.blogs.length === 0) {
          this.alertInfo();
        }
      } catch (error) {
        console.log('Error occurred while parsing response data', error);
      }

      (error) => {
        console.log('Error occurred while fetching blogs', error);
      };
    });
  }
  getCommentsByArticle(articleId: any) {
    return this.commentService.getCommentsByArticle(articleId).subscribe({
      next: () => {},
      error: (err) => {
        console.error('Error adding comment:', err);
      },
    });
  }

  addComment(blogId: any, commenterId: any) {
    const a = this.commentsForm.get('content').value;
    this.commentService.addComment(blogId, commenterId, a).subscribe(() => {
      this.commentsForm.get('content').setValue('');
      this.getBlogs();
    });
  }

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  createForm() {
    this.blogForm = this.formBuilder.group({
      description: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      images: new FormControl([]),
    });
  }

  getData(content: any, id: any) {
    this.updateCommentsForm.patchValue({
      content: content,
      id: id,
    });
    this.isEditMode = true;
    console.log('updateCommentsForm', this.updateCommentsForm.value);
  }

  onEditComment() {
    const content = this.updateCommentsForm.get('content').value;
    const cmtId = this.updateCommentsForm.get('id').value;
    this.commentService.editComment(cmtId, content).subscribe({
      next: (res) => {
        this.ngZone.run(() => {
          this.getBlogs();
        });
        this.isEditMode = false;
      },
      error: (err) => {
        console.error('Error editing comment:', err);
      },
    });
  }

  deleteComment(id: any, i: any) {
    Swal.fire({
      title: 'Are You Sure You Want To Delete This Comment?',
      text: 'This action cannot be undone',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Do it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.commentService.deleteComment(id).subscribe((res) => {});
        this.getBlogs();
      }
    });
  }

  createCommentForm() {
    this.commentsForm = this.formBuilder.group({
      content: new FormControl('', [Validators.required]),
    });
  }
  selectMultipleImage(event: any) {
    if (event.target.files.length > 0) {
      this.uploadedFiles = event.target.files;
      this.targetCount = this.uploadedFiles.length;
    }
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }
  onSubmit() {
    const formData = new FormData();

    formData.append('title', this.blogForm.get('title').value);
    formData.append('description', this.blogForm.get('description').value);

    for (let img of this.uploadedFiles) {
      formData.append('images', img);
    }

    console.log('Form data:', formData);

    this.blogService.addBlog(formData, this.connectedUser._id).subscribe(
      (data) => {
        console.log('Response:', data);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  confirm1() {
    Swal.fire({
      title: 'Are you sure you want to publish this article?',
      text: 'This action cannot be undone',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, Do it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.onSubmit();

        this.ngZone.run(() => {});
      }
      if (result.isDenied) {
        this.confirm2();
      }
    });
  }

  confirm2() {
    Swal.fire({
      title: 'Are you sure you want to cancel your work?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Discard',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Blog Deleted', '', 'success');
      }
      if (!result.isConfirmed) {
        this.showMaximizableDialog();
      }
    });
  }
  alertInfo() {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: "You Don't Have Any Blogs Yet Feel Free To Add Some",
      showConfirmButton: true,
    });
  }
}
