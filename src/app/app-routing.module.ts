import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersListComponent } from './components/members/members-list/members-list.component';
import { CharactersListComponent } from './components/characters/characters-list/characters-list.component';
import { AddCharacterComponent } from './components/characters/add-character/add-character.component';
import { EditCharacterComponent } from './components/characters/edit-character/edit-character.component';

const routes: Routes = [
  {
    path: 'members',
    component: MembersListComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
