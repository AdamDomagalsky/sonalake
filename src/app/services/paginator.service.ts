import { Injectable } from '@angular/core';

export interface Paginating {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: Array<number>;
}
@Injectable()
export class PaginatorService {

    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10): Paginating {
        const totalPages = Math.ceil(totalItems / pageSize);
        let startPage: number;
        let endPage: number;

        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        const pages = [...Array(endPage - startPage + 1).keys()].map(x => x + startPage);

        return <Paginating> {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages
        }; 
    }
}
