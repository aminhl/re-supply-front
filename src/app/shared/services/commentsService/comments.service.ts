import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}
  private _refreshNeeded = new Subject<void>();

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  addComment(articleId: any, commenterId: any, content: any): Observable<any> {
    const data = { content };
    return this.http.post(
      `${env.apiRoot}comments/${articleId}/${commenterId}`,
      data
    ).pipe(
      tap(() => {
        this._refreshNeeded.next();
      }));
  }
  editComment(id: any, content: any): Observable<any> {
    const data = { content };
    return this.http.patch(`${env.apiRoot}comments/${id}`, data).pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );
  }

  deleteComment(id: any): Observable<any> {
    return this.http.delete(`${env.apiRoot}comments/${id}`).pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );
  }
  getComments() {
    return this.http.get(`${env.apiRoot}comments`).pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );
  }

  getCommentsByArticle(articleId: any) {
    return this.http.get(`${env.apiRoot}comments/${articleId}`).pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );
  }
}
