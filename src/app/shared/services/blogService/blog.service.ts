import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  addBlog(data: any,userId : any): Observable<any> {
    return this.http.post(`${env.apiRoot}articles/`+userId, data);
  }
  editBlog(id: any, data: any): Observable<any> {
    return this.http.patch(`${env.apiRoot}articles${id}`, data);
  }
  deleteBlog(id: any): Observable<any> {
    return this.http.delete(`${env.apiRoot}${id}`);
  }
  getBlogs(): Observable<any> {
    return this.http.get(`${env.apiRoot}articles`);
  }
  
}
