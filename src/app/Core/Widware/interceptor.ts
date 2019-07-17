import { Configuration } from './../Config/configuration';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ReplaceSource } from 'webpack-sources';
import { User } from '../Models/user';

@Injectable()
export class Interceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // tslint:disable-next-line: no-debugger
    debugger;
    const lastUser: User = JSON.parse(localStorage.getItem(Configuration.LOGINED_USER_KEY));
    if( lastUser && lastUser.token){
    // add jwt to authorization header
    req = req.clone(
      {
        setHeaders : {authorization: 'Bearer' + lastUser.token}
      }
    );
  }
    return next.handle(req);
  }

  constructor() {

  }
}
