import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment.development';

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

  public login(user: User): Observable<string> {
    
    return this.http.post(this.baseApiUrl + '/api/Auth/login', user, {
      responseType: 'text',
    });
  }

  public getMe(): Observable<string> {
    return this.http.get(this.baseApiUrl + '/api/Auth', {
      responseType: 'text',
    });
  }
}
