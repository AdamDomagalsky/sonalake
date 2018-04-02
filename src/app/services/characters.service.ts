import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

export interface Character {
	id: number,
	name: string,
	species: string,
	gender: string,
	homeworld: string
}

@Injectable()
export class CharactersService {
	speciesURL: string = "http://localhost:3000/species";
	charactersURL: string = 'http://localhost:3000/characters';
	queryURL: string = '?q=';

	constructor(private http: HttpClient) { }

	getCharacters() {
		return this.http.get<Character>(this.charactersURL)
			.pipe(
				retry(3),
				catchError(this.handleError)
			);
	}

	getSpecies() {
		return this.http.get<Character>(this.speciesURL)
			.pipe(
				retry(3),
				catchError(this.handleError)
			);
	}

	insertCharacter(newRecord: Character) {
		return this.http.post(this.charactersURL, newRecord)
			.pipe(
				retry(3),
				catchError(this.handleError)
			);
	}


	deleteCharacter(id: number) {
		return this.http.delete(`${this.charactersURL}/${id}`)
			.pipe(
				retry(3),
				catchError(this.handleError)
			);
	}


	search(terms: any) {
		return terms.debounceTime(200)
			.distinctUntilChanged()
			.switchMap(term => this.searchCharacters(term));
	}

	private searchCharacters(term: string) {
		let URL = (term === '')
			? this.charactersURL
			: this.charactersURL + this.queryURL + term;

		return this.http.get<Character>(URL)
		.pipe(
			retry(3),
			catchError(this.handleError)
		);
	}

	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error('An error occurred:', error.error.message);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error}`);
		}
		// return an ErrorObservable with a user-facing error message
		return new ErrorObservable(
			'Something bad happened; please try again later.');
	};
}
