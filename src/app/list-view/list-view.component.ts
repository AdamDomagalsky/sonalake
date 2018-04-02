import { Component, OnInit } from '@angular/core';

import { CharactersService, Character } from '../services/characters.service';
import { PaginatorService } from '../services/paginator.service';
import { Subject } from 'rxjs/Subject';


@Component({
	selector: 'sl-list-view',
	templateUrl: './list-view.component.html',
})

export class ListViewComponent implements OnInit {
	
	isEmpty: boolean = true;
	private allItems: Array<Character>;
	pager: any = {};
	pagedItems: Array<Character>;
	error: any;
	searchTerm: Subject<string> = new Subject<string>();

	constructor(private paginator: PaginatorService, 
							private charactersService: CharactersService) {}

	ngOnInit() {
		this.charactersService.getCharacters()
			.subscribe(
				data => {
					console.log([...data]);
					this.allItems = [...data];
					this.setPage(1);
				},
				error => this.error = error
			)
			
			this.charactersService.search(this.searchTerm)
				.subscribe( 
					data => {
						this.allItems = [...data];
						this.setPage(1);
					},
					error => this.error = error
			)
	}


	//here i dont know how to refresh the UI after delete
	remove(id:number){
		this.charactersService.deleteCharacter(id)
			.subscribe(success =>
				this.allItems = this.allItems.filter(item => item.id !== id),
				error => this.error
			)
	}

	setPage(page: number) {
		if (page < 1 || page > this.pager.totalPages) {
			return;
		} 
		this.pager = this.paginator.getPager(this.allItems.length, page);
		this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
	}
}
