import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {environment as env} from "../../../environments/environment";
import Sentiment from 'sentiment';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {
  sentiment = new Sentiment();
  constructor(public http: HttpClient) { }

  addFeedback(target: string, title: string, message: string) {
    const emotion = this.sentiment.analyze(message);
    let category = '';

    if (emotion.score > 0) {
      category = 'positive';
    } else if (emotion.score < 0) {
      category = 'negative';
    } else {
      category = 'neutral';
    }

    const requestBody = {
      title,
      message,
      category
    };

    return this.http.post(env.apiRoot + target, requestBody, {
      withCredentials: true,
    });
  }


  getAllFeedbacks(): Observable<any> {
    return this.http.get<any>(env.apiRoot + 'feedbacks', {  withCredentials: true,});
  }
  getPositiveFeedbacks(): Observable<any> {
    return this.http.get<any>(env.apiRoot + 'feedbacks/positive', {  withCredentials: true,});
  }
  getNegativeFeedbacks(): Observable<any> {
    return this.http.get<any>(env.apiRoot + 'feedbacks/negative', {  withCredentials: true,});
  }

}
