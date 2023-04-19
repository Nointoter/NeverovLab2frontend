import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaleClass } from 'src/app/models/taleClass.model';
import { TalesService } from 'src/app/services/tales.service';

@Component({
  selector: 'app-add-tale',
  templateUrl: './add-tale.component.html',
  styleUrls: ['./add-tale.component.css']
})
export class AddTaleComponent {
  addTaleRequest: TaleClass = {
    id: 0,
    name: '',
    id_Master: 0,
    count_parties: 0,
    start_Tale: ''
  };
  
  constructor(private talesService: TalesService,
    private router: Router) {}

  ngOnInit(): void {
  }

  addCharacter() {
    this.talesService.addTale(this.addTaleRequest)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['']);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}
