import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment.development';
import { AuthenticatedResponse } from '../interfaces/authenticated-response.model';
import { TokenApi } from '../interfaces/tokenApi.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  public register(user: User): Observable<any> {
    return this.http.post<any>(
      this.baseApiUrl + '/api/Auth/register',
      user
    );
  }

  public login(user: User): Observable<AuthenticatedResponse> {
    return this.http.post<AuthenticatedResponse>(this.baseApiUrl + '/api/Auth/login', user, {
      headers: new HttpHeaders({ "Content-Type": "application/json"})
    });
  }

  public refreshToken(tokenApi: TokenApi): Observable<TokenApi> {
    return this.http.post<TokenApi>(this.baseApiUrl + "/api/token/refresh", tokenApi);
  }
}
