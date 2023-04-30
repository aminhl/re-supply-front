import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  searchChatUsers(search: any): Observable<any> {
    let params = new HttpParams();
    if (search !== undefined) {
      params = params.append('search', search);
    }
    return this.http.get(`${env.apiRoot}users/chatUsers/`, {
      params: params,
    });
  }
  accessChat(userId: any): Observable<any> {
    return this.http.post(`${env.apiRoot}chat/`, {userId});
  }
  fetchUserChats(connectedUserId: any): Observable<any> {
    return this.http.get(`${env.apiRoot}chat/${connectedUserId}`);
  }
  getBlogById(id: any): Observable<any> {
    return this.http.get(`${env.apiRoot}chat/${id}`);
  }
  deleteBlog(id: any): Observable<any> {
    return this.http.delete(`${env.apiRoot}chat/${id}`);
  }
  getBlogs(userId: any) {
    let params = new HttpParams();
    if (userId !== undefined) {
      params = params.append('owner', userId);
      console.log(params);
    }
    return this.http.get(`${env.apiRoot}chat`, { params: params });
  }
}
