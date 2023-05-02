import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpClient) {}

  postMessage(chatId: any, content: any): Observable<any> {
    return this.http.post(`${env.apiRoot}message/`, { chatId, content });
  }
  fetchMessages(chatId:any): Observable<any> {
    return this.http.get(`${env.apiRoot}message/${chatId}`);
  }
}
