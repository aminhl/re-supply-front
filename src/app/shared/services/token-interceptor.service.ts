import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private inject: Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    let authService = this.inject.get(AuthService);
    let authReq = req;
    authReq = this.addTokenHeader(req, authService.getToken())
    let jwtToken = req.clone({
      setHeaders: {
        Authorization: "Bearer " + authService.getToken()
      }
    });
    return next.handle(authReq).pipe(
      catchError(errordata => {
        if (errordata.status === 401)
          authService.logout();
        return throwError(errordata);
      })
    );
  }

  addTokenHeader(req: HttpRequest<any>, token: string|null){
    return req.clone({headers: req.headers.set("Authorization", "Bearer " + token)})
  }
}
