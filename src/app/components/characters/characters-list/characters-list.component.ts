import { Component, ViewChild } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { ApiResponse } from 'src/app/models/apiResponse.model';
import { CharactersService } from 'src/app/services/characters.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent {

  public page: number;
  public pageEvent: PageEvent;

  characters: Character[] = [];
  apiResponse: ApiResponse = new ApiResponse();
  dataSource = this.characters;
  displayedColumns: string[] = ['id', 'id_Member', 'name', 'gender', 'race', 'link'];

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  constructor(private charactersService: CharactersService, pageEvent: PageEvent) { 
    this.page = 1;
    this.pageEvent = pageEvent;    
  }



  ngOnInit(): void {
    this.charactersService.getAllCharacters()
    .subscribe({
      next: (response) => {
        console.log(response);
        this.apiResponse = response as ApiResponse;
        this.characters = this.apiResponse.responseData as Character[];
        this.dataSource = this.characters;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

}
