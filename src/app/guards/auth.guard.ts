import { AuthenticatedResponse } from './../interfaces/authenticated-response.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.development';
import { TokenApi } from '../interfaces/tokenApi.model';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private router:Router, private jwtHelper: JwtHelperService, private http: HttpClient, ){}
  
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)){
      console.log(this.jwtHelper.decodeToken(token))
      return true;
    }

    const isRefreshSuccess = await this.tryRefreshingTokens(token!); 
    if (!isRefreshSuccess) { 
      this.router.navigate(["login"]); 
    }
    
    return isRefreshSuccess;
  }

  private async tryRefreshingTokens(token: string): Promise<boolean> {
    // Try refreshing tokens using refresh token
    const refreshToken: string = localStorage.getItem("refreshToken")!;
    if (!token || !refreshToken) { 
      return false;
    }
    
    const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
    let isRefreshSuccess: boolean;

    const refreshRes = await new Promise<TokenApi>((resolve, reject) => {
      this.http.post<TokenApi>(this.baseApiUrl + "/api/token/refresh", credentials, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe({
        next: (res: TokenApi) => resolve(res),
        error: (_) => { reject; isRefreshSuccess = false;}
      });
    });

    localStorage.setItem("jwt", refreshRes.accessToken);
    localStorage.setItem("refreshToken", refreshRes.refreshToken);
    isRefreshSuccess = true;

    return isRefreshSuccess;
  }
  
}
