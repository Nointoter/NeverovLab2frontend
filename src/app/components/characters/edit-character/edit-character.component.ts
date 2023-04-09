import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterClass } from 'src/app/models/characterClass.model';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-edit-character',
  templateUrl: './edit-character.component.html',
  styleUrls: ['./edit-character.component.css']
})
export class EditCharacterComponent {

  Character: CharacterClass = {
    id: 0,
    id_Member: 0,
    name: '',
    gender: 0,
    race: '',
  };
  
  constructor(private route: ActivatedRoute,
    private charactersServise: CharactersService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.charactersServise.getCharacterById(id)
          .subscribe({
            next: (response) => {
              this.Character = response.responseData as CharacterClass;      
            }
          })
        }
      }
    })
  }

  updateCharacter() {
    this.charactersServise.updateCharacter(this.Character)
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

  deleteCharacter(id: number) {
    this.charactersServise.deleteCharacterById(id)
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
