import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/services/blogService/blog.service';
import Swal from 'sweetalert2';
import { environment as env } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommentsService } from 'src/app/shared/services/commentsService/comments.service';
@Component({
  selector: 'app-blogs-management',
  templateUrl: './blogs-management.component.html',
  styleUrls: ['./blogs-management.component.css'],
})
export class BlogsManagementComponent implements OnInit {
  userId: any;
  currentPage = 1;
  blogs: any[];
  constructor(
    private blogService: BlogService,
    private http: HttpClient,
    private commentService: CommentsService
  ) {
    this.getBlogs();
  }

  ngOnInit(): void {}
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
  acceptBlog(id: any) {
    const blog = this.blogs.find((p: any) => p._id === id);
    if (blog.isApproved) {
      Swal.fire('Blog already approved', '', 'warning');
      return;
    }
    Swal.fire({
      title: 'Are you sure you want to approve this blog?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, accept it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.approveBlog(id).subscribe((res) => {
           Swal.fire({
             position: 'center',
             icon: 'success',
             title: 'Blog Approved!',
             showConfirmButton: false,
           });
        });
         setTimeout((handler) => {
           window.location.reload();
         }, 1000);
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
          }, 1000);
        });
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
