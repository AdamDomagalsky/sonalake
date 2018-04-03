import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { CharactersService, Character } from '../services/characters.service';
import { PaginatorService, Paginating } from '../services/paginator.service';

@Component({
    selector: 'sl-list-view',
    templateUrl: './list-view.component.html',
})

export class ListViewComponent implements OnInit {

    private allItems: Array<Character>;
    pager: Paginating;
    pagedItems: Array<Character>;
    error: any;
    searchTerm: Subject<string> = new Subject<string>();

    constructor(private paginator: PaginatorService,
        private charactersService: CharactersService) {
        this.pager = <Paginating>{};
    }

    ngOnInit() {
        this.getCharactersArray();
        this.charactersService.search(this.searchTerm)
            .subscribe(
                data => {
                    this.allItems = [...data];
                    this.setPage();
                },
                error => this.error = error
            );
    }

    getCharactersArray() {
        this.charactersService.getCharacters()
            .subscribe(
                data => {
                    console.log([...data]);
                    this.allItems = [...data];
                    this.setPage(this.pager.currentPage);
                },
                error => this.error = error
            );
    }

    remove(id: number) {
        this.charactersService.deleteCharacter(id)
            .subscribe(success =>
                this.getCharactersArray(),
                error => this.error
            );
    }

    setPage(page: number = 1) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.paginator.getPager(this.allItems.length, page);
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
