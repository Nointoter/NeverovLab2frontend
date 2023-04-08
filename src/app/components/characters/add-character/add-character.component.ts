import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddCharacter } from 'src/app/models/addCharacter.model';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent {

  addCharacterRequest: AddCharacter = {
    id: 0,
    id_Member: 0,
    name: '',
    gender: 0,
    race: '',
  };
  constructor(private characterService: CharactersService,
    private router: Router) {}

  ngOnInit(): void {
  }

  addCharacter() {
    this.characterService.addCharacter(this.addCharacterRequest)
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
