import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterClass } from 'src/app/models/characterClass.model';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent {

  addCharacterRequest: CharacterClass = {
    id: 0,
    id_Member: 0,
    name: '',
    gender: 0,
    race: '',
  };
  
  constructor(private charactersService: CharactersService,
    private router: Router) {}

  ngOnInit(): void {
  }

  addCharacter() {
    const CharacterTokenModel: CharacterTokenModel = { CharacterModel: this.addCharacterRequest, token: localStorage.getItem("jwt")! };
    this.charactersService.addCharacter(CharacterTokenModel)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['characters']);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}

export class CharacterTokenModel {
  CharacterModel?: CharacterClass;
  token?: string;
}
