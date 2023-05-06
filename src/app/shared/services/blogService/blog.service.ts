import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';
import { environment as env } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}
  private _refreshNeeded = new Subject<void>();

  get refreshNeeded() {
    return this._refreshNeeded;
  }
  addBlog(data: any, userId: any): Observable<any> {
    return this.http.post(`${env.apiRoot}articles/` + userId, data).pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );
  }
  editBlog(id: any, data: any): Observable<any> {
    return this.http.patch(`${env.apiRoot}articles/${id}`, {title: data.title, description: data.description});
  }
  approveBlog(id: any): Observable<any> {
    return this.http.put(`${env.apiRoot}articles/${id}`, {}).pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );
  }
  getBlogById(id: any): Observable<any> {
    return this.http.get(`${env.apiRoot}articles/${id}`).pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );
  }
  deleteBlog(id: any): Observable<any> {
    return this.http.delete(`${env.apiRoot}articles/${id}`);
  }
  getBlogs(userId: any) {
    let params = new HttpParams();
    if (userId !== undefined) {
      params = params.append('owner', userId);
      console.log(params);
    }
    return this.http.get(`${env.apiRoot}articles`, { params: params }).pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );
  }
}
