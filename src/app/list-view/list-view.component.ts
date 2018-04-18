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
        this.getCharactersArray(1);
        this.searchCharacter();
    }

    searchCharacter() {
        this.charactersService.search(this.searchTerm)
            .subscribe(
                data => {
                    console.log(data);
                    this.allItems = data;
                    this.setPage();
                },
                error => this.error = error
            );
    }

    getCharactersArray(page: number = 1) {
        this.charactersService.getCharacters()
            .subscribe(
                data => {
                    console.log(data);
                    this.allItems = data;
                    this.setPage(page);
                },
                error => this.error = error
            );
    }

    remove(id: number) {
        this.charactersService.deleteCharacter(id)
            .subscribe(success =>
                this.getCharactersArray(
                    this.pager.endPage === this.pager.currentPage
                        ? Math.ceil((this.pager.totalItems - 1) / this.pager.pageSize)
                        : this.pager.currentPage),
                error => this.error
            );
    }

    setPage(page: number = 1) {
        if (page < 1 || page > this.pager.totalPages + 1) {
            return;
        }
        this.pager = this.paginator.getPager(this.allItems.length, page);
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
