import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MembersListComponent } from './components/members/members-list/members-list.component';
import { CharactersListComponent } from './components/characters/characters-list/characters-list.component';
import { AddCharacterComponent } from './components/characters/add-character/add-character.component';
import { FormsModule } from '@angular/forms';
import { EditCharacterComponent } from './components/characters/edit-character/edit-character.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthInterceptor } from './services/auth.interceptor';
import { environment } from 'src/environments/environment';

export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

@NgModule({
  declarations: [
    AppComponent,
    MembersListComponent,
    CharactersListComponent,
    AddCharacterComponent,
    EditCharacterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.baseApiUrl],
        disallowedRoutes: []
      }
    }),
  ],
  providers: [
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
  //providers: [AuthGuard],
  /*providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],*/
  bootstrap: [AppComponent]
})
export class AppModule { }
