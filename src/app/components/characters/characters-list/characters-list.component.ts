import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { ApiResponse } from 'src/app/models/apiResponse.model';
import { CharactersService } from 'src/app/services/characters.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent {

  displayedColumns: string[] = ['id', 'id_Member', 'name', 'gender', 'race', 'link'];
  dataSource: MatTableDataSource<Character>

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  characters: Character[] = [];
  apiResponse: ApiResponse = new ApiResponse();

  constructor(private charactersService: CharactersService) {
    this.dataSource = new MatTableDataSource(this.characters)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(data: string) {
    data = data.trim(); // Remove whitespace
    data = data.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = data;
  }

  ngOnInit(): void {
    this.charactersService.getAllCharacters()
    .subscribe({
      next: (response) => {
        console.log(response);
        this.apiResponse = response as ApiResponse;
        this.characters = this.apiResponse.responseData as Character[];
        this.dataSource = new MatTableDataSource(this.characters);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
}
