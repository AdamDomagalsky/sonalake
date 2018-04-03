import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Character, CharactersService } from '../services/characters.service';
@Component({
  selector: 'sl-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.css']
})

export class CharacterFormComponent implements OnInit {
  error: any;
  spcs: Array<string> = [];
  characterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private charactersService: CharactersService) { }

  ngOnInit() {
    this.charactersService.getSpecies()
    .subscribe(
      data => this.spcs = [...data],
      error => this.error = error
    );
    this.creatForm();
  }

  creatForm() {
    this.characterForm = this.fb.group({
      name: ['', Validators.required],
      id: '',
      species: ['', Validators.required],
      gender: ['', Validators.required],
      homeworld: ''
    });
  }

  onSubmit() {
    this.charactersService.insertCharacter(this.characterForm.value)
      .subscribe(
        success => this.router.navigate(['/']),
        error => this.error
      );
  }
}
