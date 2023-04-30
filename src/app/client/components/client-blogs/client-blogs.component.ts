import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BlogService } from 'src/app/shared/services/blogService/blog.service';
import Swal from 'sweetalert2';
import { map, catchError, switchMap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { CommentsService } from 'src/app/shared/services/commentsService/comments.service';

@Component({
  selector: 'app-client-blogs',
  templateUrl: './client-blogs.component.html',
  styleUrls: ['./client-blogs.component.css'],
})
export class ClientBlogsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private formBuilder: FormBuilder,
    public sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private commentService: CommentsService
  ) {
    this.createForm();
    this.createCommentForm();
  }
  updateBlogForm = this.formBuilder.group({
    title: '',
    description: '',
    images: [],
    id: '',
  });

  imageUrls: any[] = [];
  connectedUser: any;
  blogForm: FormGroup;
  commentsForm: FormGroup;
  description: FormControl;
  id: FormControl;
  title: FormControl;
  blogs: any[];
  comments: any[];
  displayMaximizable1: boolean;
  displayMaximizable2: boolean;
  items: MenuItem[];
  images: FormControl[];
  uploadedFiles: any[] = [];
  userId: any;
  targetCount: number;
  isEditMode = false;
  updateCommentsForm = this.formBuilder.group({
    content: '',
    id: '',
  });
  ngOnInit() {
    this.getBlogs();
    this.authService.getUser().subscribe((res) => {
      this.connectedUser = res.data.user;
    });
    this.commentService.getComments().subscribe((res) => {
      this.comments = res['data']['comments'];
    });
  }
  getDataComment(content: any, id: any) {
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

          window.location.reload();
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
        this.commentService.deleteComment(id).subscribe((res) => {
          this.comments.splice(i, 1);
        });
          window.location.reload();
      }
    });
  }

  addComment(blogId: any, commenterId: any) {
    const a = this.commentsForm.get('content').value;
    this.commentService.addComment(blogId, commenterId, a).subscribe({
      next: (res) => {
          window.location.reload()
      },
      error: (err) => {
        console.error('Error adding comment:', err);
      },
    });
  }

  createCommentForm() {
    this.commentsForm = this.formBuilder.group({
      content: new FormControl('', [Validators.required]),
    });
  }
  getBlogs() {
    try {
      this.authService.getUser().subscribe(
        (userRes: any) => {
          this.userId = userRes.data.user._id; // Store userId
          console.log('User ID:', this.userId);

          this.blogService.getBlogs(this.userId).subscribe(
            (blogsRes: any) => {
              this.blogs = blogsRes.data.articles; // Store blogs
              if (this.blogs.length == 0) this.alertInfo();
            },
            (error) => {
              console.log('Error occurred while fetching blogs', error);
            }
          );
        },
        (error) => {
          console.log('Error occurred while fetching user', error);
        }
      );
    } catch (error) {
      console.log('Error occurred while fetching blogs', error);
    }
  }
  getCommentsByArticle(articleId: any) {
    return this.commentService.getCommentsByArticle(articleId).subscribe({
      next: (res) => {},
      error: (err) => {
        console.error('Error adding comment:', err);
      },
    });
  }
  getData(title: any, description: any, images: any, id: any) {
    this.updateBlogForm.patchValue({
      title: title,
      description: description,
      images: images,
      id: id,
    });
    console.log(this.updateBlogForm.value);
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

  selectMultipleImage(event: any) {
    if (event.target.files.length > 0) {
      this.uploadedFiles = event.target.files;
      this.targetCount = this.uploadedFiles.length;
    }
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('title', this.blogForm.get('title').value);
    formData.append('description', this.blogForm.get('description').value);

    for (let img of this.uploadedFiles) {
      formData.append('images', img);
    }
    this.blogService.addBlog(formData, this.connectedUser._id).subscribe(
      (data) => {
        console.log('Response:', data);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    window.location.reload();
  }
  onSubmitEdit() {
    const formData = new FormData();

    formData.append('title', this.updateBlogForm.get('title').value);
    formData.append(
      'description',
      this.updateBlogForm.get('description').value
    );
    formData.append('id', this.updateBlogForm.get('id').value);
    const blogId = this.updateBlogForm.get('id').value;
    for (let img of this.uploadedFiles) {
      formData.append('images', img);
    }
    this.blogService.editBlog(blogId, formData).subscribe(
      (data) => {
        let index = this.blogs.findIndex(
          (blog) => blog._id == this.updateBlogForm.get('id').value
        );
        this.blogs[index].title = this.updateBlogForm.get('title').value;
        this.blogs[index].description =
          this.updateBlogForm.get('description').value;
        this.blogs[index].images = this.updateBlogForm.get('images').value;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  showMaximizableDialog() {
    this.displayMaximizable1 = true;
  }
  showMaximizableDialog1() {
    this.displayMaximizable2 = true;
  }

  confirm1() {
    Swal.fire({
      title: 'Are you sure you want to Update this article?',
      text: 'This action cannot be undone',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, Do it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.onSubmitEdit();
       Swal.fire({
         position: 'center',
         icon: 'success',
         title: 'Blog Created',
         showConfirmButton: false,
         timer: 1000,
       });
       setTimeout(() => {
         window.location.reload();
       }, 500);
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
      confirmButtonText: 'Yes, Discard It!',
      cancelButtonText: 'Discard',
    }).then((result) => {
      if (result.isConfirmed) {

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
  confirm3() {
    Swal.fire({
      title: 'Are you sure you want to publish this article?',
      text: 'This action cannot be undone',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, Do it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Blog Created!',
          showConfirmButton: false,
          timer: 1000,
        });
          this.onSubmit();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
      if (result.isDenied) {
        this.confirm2();
      }
    });
  }

  confirm4() {
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
  deleteBlog(id: any) {
    Swal.fire({
      title: 'Are you sure you want to delete this blog?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteBlog(id).subscribe((res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Blog Deleted!',
            showConfirmButton: false,
          });
          setTimeout((handler) => {
            window.location.reload();
          },1000)
        });
      }
    });
  }
}
