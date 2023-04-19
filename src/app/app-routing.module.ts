import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersListComponent } from './components/characters/characters-list/characters-list.component';
import { AddCharacterComponent } from './components/characters/add-character/add-character.component';
import { EditCharacterComponent } from './components/characters/edit-character/edit-character.component';
import { TalesListComponent } from './components/tales/tales-list/tales-list.component';
import { AddTaleComponent } from './components/tales/add-tale/add-tale.component';
import { MasterTalesListComponent } from './components/tales/master-tales-list/master-tales-list.component';
import { EditTaleComponent } from './components/tales/edit-tale/edit-tale.component';
import { SessionsComponent } from './components/sessions/sessions.component';

const routes: Routes = [
  {
    path: '',
    component: TalesListComponent
  },
  {
    path: 'tales/add',
    component: AddTaleComponent
  },
  {
    path: 'tales/master',
    component: MasterTalesListComponent
  },
  {
    path: 'tales/edit/:id',
    component: EditTaleComponent
  },
  {
    path: 'characters',
    component: CharactersListComponent
  },
  {
    path: 'characters/add',
    component: AddCharacterComponent
  },
  {
    path: 'characters/edit/:id',
    component: EditCharacterComponent
  },
  {
    path: 'session/:id',
    component: SessionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
