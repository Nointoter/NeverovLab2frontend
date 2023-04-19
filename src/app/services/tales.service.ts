import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ApiResponse } from '../models/apiResponse.model';
import { Observable } from 'rxjs';
import { TaleClass } from '../models/taleClass.model';
import { Session } from '../components/tales/edit-tale/edit-tale.component';

@Injectable({
  providedIn: 'root'
})
export class TalesService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllTales(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseApiUrl + '/api/Tales/GetTales')
  }

  addTale(addTaleRequest: TaleClass): Observable<object> {
    return this.http.post<object>(this.baseApiUrl + '/api/Tales/SaveTale',
    addTaleRequest)
  }

  getMasterTales(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseApiUrl + '/api/Tales/GetTalesByIdMaster')
  }

  getTaleById(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseApiUrl + '/api/Tales/GetTalesByIdTale/' + id);
  }

  updateTale(tale: TaleClass): Observable<object> {
    return this.http.put<object>(this.baseApiUrl + '/api/Tales/UpdateTale',
    tale)
  }

  deleteTaleById(id: number): Observable<object> {
    return this.http.delete<object>(this.baseApiUrl + '/api/Tales/DeleteTale/' + id)
  }

  getSessionById(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseApiUrl + '/api/Sessions/GetSessionByIdTale/' + id);
  }

  addCharacter(session: Session): Observable<object> {
    return this.http.post<object>(this.baseApiUrl + '/api/Sessions/SaveSession',
    session)
  }

  deleteCharacter(session: Session): Observable<object> {
    return this.http.post<object>(this.baseApiUrl + '/api/Sessions/DeleteSession',
    session)
  }

}
