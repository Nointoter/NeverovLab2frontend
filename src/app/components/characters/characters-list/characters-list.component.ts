import { Component } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { ApiResponse } from 'src/app/models/apiResponse.model';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent {

  characters: Character[] = [];
  apiResponse: ApiResponse = new ApiResponse();

  constructor(private charactersService: CharactersService) { }

  ngOnInit(): void {
    this.charactersService.getAllCharacters()
    .subscribe({
      next: (response) => {
        console.log(response);
        this.apiResponse = response as ApiResponse;
        this.characters = this.apiResponse.responseData as Character[];
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
}
