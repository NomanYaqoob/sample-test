import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptorService {
  baseUrl = environment.baseUrl;
  defaultVersion = environment.defaultVersion;

  constructor() { }

  intercept<T>(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request: any = {
      url: `${this.baseUrl}${this.defaultVersion}${req.url}`,
      setHeaders: {
        'access-key': environment.accessKey
      }
    };
    req = req.clone(request);
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => { },
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse.error);
          return throwError(errorResponse);
        }
      )
    );
  }
}
