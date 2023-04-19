import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaleClass } from 'src/app/models/taleClass.model';
import { TalesService } from 'src/app/services/tales.service';

@Component({
  selector: 'app-edit-tale',
  templateUrl: './edit-tale.component.html',
  styleUrls: ['./edit-tale.component.css']
})
export class EditTaleComponent {
  
  id: number = 0;
  
  tale: TaleClass = {
    id: 0,
    name: '',
    id_Master: 0,
    count_parties: 0,
    start_Tale: ''
  };
  
  constructor(private route: ActivatedRoute,
    private talesServise: TalesService,
    private router: Router) { 
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = Number(params.get('id'));

        if (this.id) {
          this.talesServise.getTaleById(this.id.toString())
            .subscribe({
              next: (response) => {
                this.tale = response.responseData as TaleClass;
              }
            })
        }
      }
    })
  }

  updateTale() {
    this.talesServise.updateTale(this.tale)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['tales/master']);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  deleteTale(id: number) {
    this.talesServise.deleteTaleById(id)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['tales/master']);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

}

export class Session {
  id_Tale?: number;
  id_Character?: number;
}
