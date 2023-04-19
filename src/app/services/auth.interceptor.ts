import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { TokenApi } from '../interfaces/tokenApi.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token = localStorage.getItem("jwt");
  refresh = false;
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient, private authService: AuthService, private router:Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem("jwt")!}`
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
                Authorization: `Bearer ${localStorage.getItem("jwt")!}`
              }
            }));
          })
        );
      }
      if ((err.status === 501 || err.status === 502) && !this.refresh) {
        return this.authService.logout();
      }
      this.refresh = false;
      return throwError(() => err);
    }));
  }
}