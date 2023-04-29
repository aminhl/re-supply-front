import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  addComment(articleId: any, commenterId: any, content: any): Observable<any> {
    const data = { content };
    return this.http.post(
      `${env.apiRoot}comments/${articleId}/${commenterId}`,
      data
    );
  }
  editComment(id: any, content: any): Observable<any> {
    const data = { content };
    return this.http.patch(`${env.apiRoot}comments/${id}`, data);
  }

  deleteComment(id: any): Observable<any> {
    return this.http.delete(`${env.apiRoot}comments/${id}`);
  }
  getComments() {
    return this.http.get(`${env.apiRoot}comments`);
  }

  getCommentsByArticle(articleId: any) {
    return this.http.get(`${env.apiRoot}comments/${articleId}`);
  }
}
