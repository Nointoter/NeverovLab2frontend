import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiResponse.model';
import { CharacterClass } from '../models/characterClass.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient)  { }

  getAllCharacters(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseApiUrl + '/api/Characters/GetCharacters')
  }

  addCharacter(addCharacterRequest: CharacterClass): Observable<object> {
    return this.http.post<object>(this.baseApiUrl + '/api/Characters/SaveCharacter',
    addCharacterRequest)
  }

  getCharacterById(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseApiUrl + '/api/Characters/GetCharacterById/' + id);
  }

  updateCharacter(character: CharacterClass): Observable<object> {
    return this.http.put<object>(this.baseApiUrl + '/api/Characters/UpdateCharacter',
    character)
  }

  deleteCharacterById(id: number): Observable<object> {
    return this.http.delete<object>(this.baseApiUrl + '/api/Characters/DeleteCharacter/' + id)
  }
}
