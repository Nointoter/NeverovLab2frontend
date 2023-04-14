import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { TokenApi } from '../interfaces/tokenApi.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("jwt");
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          //this.authService.logout();
          const token = localStorage.getItem("jwt")!;
          const refreshToken = localStorage.getItem("refreshToken")!;
          const credentials: TokenApi = { accessToken: token, refreshToken: refreshToken };
          this.authService.refreshToken(credentials)
          .subscribe({
            next: (response) => {
              console.log("this response manham");
              console.log(response);
              localStorage.setItem("jwt", response.accessToken);
              localStorage.setItem("refreshToken", response.refreshToken);
            },
            error: (response) => {
              //console.log(response);
            }
          });
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
/*export class AuthInterceptor implements HttpInterceptor {
  token = localStorage.getItem("jwt");
  refresh = false;
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient, private authService: AuthService, private router:Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`
      }
    });

    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !this.refresh) {
        this.refresh = true;
        this.token = localStorage.getItem("jwt")!;
        const refreshToken = localStorage.getItem("refreshToken")!;
        const credentials: TokenApi = { accessToken: this.token, refreshToken: refreshToken };

        return this.authService.refreshToken(credentials).pipe(
          switchMap((res: TokenApi) => {
            localStorage.setItem("jwt", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            this.token = res.accessToken;
            return next.handle(request.clone({
              setHeaders: {
                Authorization: `Bearer ${this.token}`
              }
            }));
          })
        );
      }
      this.refresh = false;
      return throwError(() => err);
    }));
  }
}*/