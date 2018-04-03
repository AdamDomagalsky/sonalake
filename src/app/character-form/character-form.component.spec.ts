import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

import { CharacterFormComponent } from './character-form.component';
import { CharactersService, Character } from '../services/characters.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CharacterFormComponent', () => {
  let component: CharacterFormComponent;
  let fixture: ComponentFixture<CharacterFormComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule],
      declarations: [CharacterFormComponent],
      providers: [CharactersService, HttpClient, HttpHandler]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('form invalid when empty', () => {
    expect(component.characterForm.valid).toBeFalsy();
  });


  // it('name field validity', () => {
  //   let name = component.characterForm.controls['name'];
  //   expect(name.valid).toBeFalsy();
  // });


  // it('name field validity', () => {
  //   let errors = {};
  //   let name = component.characterForm.controls['name'];
  //   errors = name.errors || {};
  //   expect(errors['required']).toBeTruthy();
  // });






});
