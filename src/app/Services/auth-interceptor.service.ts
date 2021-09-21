import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const apiUrl: string = environment.APIUrl

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.indexOf('api') === 0) {
      req = req.clone({
        url: apiUrl.concat(req.url)
      });
    }

    req = req.clone({
      setHeaders:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });



    return next.handle(req).pipe(
      tap(
        httpEvent => null, // Nothing todo on success
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401 || error.status === 403) {
              window.location.href = '/login';
            }
          }
        }
      )
    );
  }
}
