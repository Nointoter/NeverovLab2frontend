import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'src/app/models/apiResponse.model';
import { Tale } from 'src/app/models/tale.model';
import { TalesService } from 'src/app/services/tales.service';

@Component({
  selector: 'app-tales-list',
  templateUrl: './tales-list.component.html',
  styleUrls: ['./tales-list.component.css']
})
export class TalesListComponent {
  displayedColumns: string[] = ['id', 'name', 'name_Master', 'count_parties', 'start_Tale', 'link'];
  dataSource: MatTableDataSource<Tale>

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  tales: Tale[] = [];
  apiResponse: ApiResponse = new ApiResponse();

  constructor(private talesService: TalesService) {
    this.dataSource = new MatTableDataSource(this.tales)
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
    this.talesService.getAllTales()
    .subscribe({
      next: (response) => {
        //console.log(response);
        this.apiResponse = response as ApiResponse;
        this.tales = this.apiResponse.responseData as Tale[];
        this.dataSource = new MatTableDataSource(this.tales);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
}
