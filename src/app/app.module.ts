import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListViewComponent } from './list-view/list-view.component';

import { PaginatorService } from './services/paginator.service';
import { CharactersService } from './services/characters.service';
import { CharacterFormComponent } from './character-form/character-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    CharacterFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [PaginatorService, CharactersService],
  bootstrap: [AppComponent],
})
export class AppModule { }
