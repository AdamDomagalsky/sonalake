import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Location } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { CharactersService } from '../services/characters.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CharacterFormComponent } from './character-form.component';

describe('CharactercharacterFormComponent', () => {
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

  it('characterForm invalid when empty', () => {
    expect(component.characterForm.valid).toBeFalsy();
  });


  it('name field validity', () => {
    const name = component.characterForm.controls['name'];
    name.setValue('TestnName');
    const errors = name.errors || {};
    expect(errors['reqired']).toBeFalsy();
    expect(name.valid).toBeTruthy();
  });

  it('gender field validity', () => {
    const gender = component.characterForm.controls['gender'];
    gender.setValue('male');
    const errors = gender.errors || {};
    expect(errors['reqired']).toBeFalsy();
    expect(gender.valid).toBeTruthy();
  });

  it('species field validity', () => {
    const species = component.characterForm.controls['species'];
    species.setValue('Dug');
    const errors = species.errors || {};
    expect(errors['reqired']).toBeFalsy();
    expect(species.valid).toBeTruthy();
  });


  it('submitting a characterForm emits a character', fakeAsync(() => {
    expect(component.characterForm.valid).toBeFalsy();
    component.characterForm.controls['name'].setValue('SubmitTestName');
    component.characterForm.controls['species'].setValue('Dug');
    component.characterForm.controls['gender'].setValue('female');
    expect(component.characterForm.valid).toBeTruthy();
    component.characterForm.controls['homeworld'].setValue('RandomWOrld');

    component.onSubmit();
    // ROUTING TEST
    tick(500);
    const location = TestBed.get(Location);
    expect(location.path()).toBe('');
  }));
});
