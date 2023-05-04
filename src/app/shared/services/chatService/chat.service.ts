import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';
import { environment as env } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private _refreshNeeded = new Subject<void>();

  get refreshNeeded() {
    return this._refreshNeeded;
  }
  constructor(private http: HttpClient) {}

  searchChatUsers(search: any): Observable<any> {
    let params = new HttpParams();
    if (search !== undefined) params = params.append('search', search);

    return this.http
      .get(`${env.apiRoot}users/chatUsers/`, {
        params: params,
      })
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }
  accessChat(userId: any): Observable<any> {
    return this.http.post(`${env.apiRoot}chat/`, { userId }).pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );;
  }
  createGroup(users: any[], chatName: string): Observable<any> {
    const data = {
      chatName: chatName,
      users: JSON.stringify(users.map((user) => user._id)),
    };
    return this.http.post(`${env.apiRoot}chat/createGroup/`, data).pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );;
  }

  fetchUserChats(): Observable<any> {
    return this.http.get(`${env.apiRoot}chat/`).pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );;
  }
  addToGroup(chatId: any, userId): Observable<any> {
    return this.http
      .put(`${env.apiRoot}chat/addToGroup/`, { chatId, userId })
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );;
  }
  renameGroup(chatId: any, chatName: any): Observable<any> {
    return this.http
      .put(`${env.apiRoot}chat/renameGroup/`, {
        chatId,
        chatName,
      })
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );;
  }
  removeFromGroup(chatId: any, userId): Observable<any> {
    return this.http
      .put(`${env.apiRoot}chat/removeFromGroup`, {
        chatId,
        userId,
      })
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );;
  }
}
