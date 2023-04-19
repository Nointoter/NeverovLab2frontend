import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'src/app/models/apiResponse.model';
import { CharacterClass } from 'src/app/models/characterClass.model';
import { Session } from '../tales/edit-tale/edit-tale.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TalesService } from 'src/app/services/tales.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent {
  displayedColumns: string[] = ['id', 'name', 'race', 'link'];
  dataSource: MatTableDataSource<CharacterClass>

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  id: number = 0;
  characters: CharacterClass[] = [];
  apiResponse: ApiResponse = new ApiResponse();

  session: Session = new Session();

  constructor(private route: ActivatedRoute,
    private talesServise: TalesService,
    private router: Router) { 
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
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = Number(params.get('id'));
        this.talesServise.getSessionById(this.id.toString())
        .subscribe({
          next: (response) => {
            //console.log(response);
            this.apiResponse = response as ApiResponse;
            this.characters = this.apiResponse.responseData as CharacterClass[];
            console.log(this.characters);
            this.dataSource = new MatTableDataSource(this.characters);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: (response) => {
            console.log(response);
          }
        })
      }})
  }
  
  addCharacter(id: number) {
    this.session.id_Character = id;
    this.session.id_Tale = this.id;
    this.talesServise.addCharacter(this.session)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['tales/edit/' + this.id]);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  deleteCharacter(id: number) {
    this.session.id_Character = id;
    this.session.id_Tale = this.id;
    this.talesServise.deleteCharacter(this.session)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['tales/edit/' + this.id]);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}
