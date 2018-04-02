import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListViewComponent } from './list-view/list-view.component';
import { CharacterFormComponent } from './character-form/character-form.component';

const routes: Routes = [
  {
    path: '',
    component: ListViewComponent
  },
  {
    path: 'new-character',
    component: CharacterFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
