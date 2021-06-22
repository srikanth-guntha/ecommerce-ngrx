import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '@ecommerce/shared/services';
import { Observable, Subscription } from 'rxjs';
import { EkartFacade } from '@ecommerce/shared/ekart-store';

@Component({
  selector: 'ecommerce-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchString$!: Observable<string>;
  public searchBooks: Book[] = [];
  public showDelete = false;
  public errorMessage = '';
  searchSubscription: Subscription = new Subscription();

  constructor(private ekartFacade: EkartFacade) {}

  ngOnInit(): void {
    this.showBooksBySearch();
  }

  showBooksBySearch() {
    this.searchString$ = this.ekartFacade.getSearchString$;
    this.searchSubscription = this.ekartFacade.getSearchBooksSuccess$.subscribe(
      (searchBooks) => {
        this.searchBooks = searchBooks;
      }
    );
    this.ekartFacade.getBookFailureInfo$.subscribe((error) => {
      if (error) this.errorMessage = error;
    });
  }

  searchBooksBySearchName(searchString: string) {
    this.ekartFacade.loadSearchBooks(searchString);
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
