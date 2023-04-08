import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiResponse.model';
import { AddCharacter } from '../models/addCharacter.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient)  { }

  getAllCharacters(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseApiUrl + '/api/Characters/GetCharacters')
  }

  addCharacter(addCharacterRequest: AddCharacter): Observable<object> {
    return this.http.post<object>(this.baseApiUrl + '/api/Characters/SaveCharacter',
    addCharacterRequest)
  }
}
