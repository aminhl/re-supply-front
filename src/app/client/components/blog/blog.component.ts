import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css', './blog.component.scss'],
})
export class BlogComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }
  ngOnInit() {
    this.blogService.getBlogs().subscribe(
      (res) => {
        try {
          this.blogs = res.data.articles;
        } catch (error) {
          console.log('Error occurred while parsing response data', error);
        }
      },
      (error) => {
        console.log('Error occurred while fetching blogs', error);
      }
    );
    this.authService.getUser().subscribe((res) => {
      this.connectedUser = res.data.user;
      console.log(this.connectedUser);
    });
  }

  imageUrls: any[] = [];
  connectedUser: any;
  blogForm: FormGroup;
  description: FormControl;
  title: FormControl;
  blogs: any[];
  displayMaximizable: boolean;
  items: MenuItem[];
  images: FormControl[];
  uploadedFiles: any[] = [];

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
    }
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

  get f() {
    return this.blogForm.controls;
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
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
        Swal.fire('Blog Created', '', 'success');
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

}
