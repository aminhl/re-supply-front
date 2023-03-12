import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  get(target: string) {
    return this.http.get(env.apiRoot + target);
  }

  add(target: string, requestBody: Object) {
    return this.http.post(env.apiRoot + target, requestBody);
  }

  delete(target: string, elementId: number) {
    return this.http.delete(env.apiRoot + target + '/' + elementId);
  }

  update(target: string, elementId: number, requestBody: Object) {
    return this.http.patch(env.apiRoot + target + '/' + elementId, requestBody);
  }

}
