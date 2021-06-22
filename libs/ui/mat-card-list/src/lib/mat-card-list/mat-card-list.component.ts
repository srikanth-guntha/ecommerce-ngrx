import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '@ecommerce/shared/services';
import { Router } from '@angular/router';
import { EkartFacade } from '@ecommerce/shared/ekart-store';

@Component({
  selector: 'ecommerce-mat-card-list',
  templateUrl: './mat-card-list.component.html',
  styleUrls: ['./mat-card-list.component.scss'],
})
export class MatCardListComponent {
  @Input()
  bookList!: Book[];

  @Input()
  errorMessage!: string;

  @Input()
  showDelete!: boolean;

  @Output() deleteBook = new EventEmitter();

  constructor(private router: Router, private ekartFacade: EkartFacade) {}

  showBookInfo(book: Book) {
    this.router.navigate(['/bookinfo'], { queryParams: { id: book.id } });
  }

  delete(book: Book) {
    this.ekartFacade.deleteCartItem(book);
    this.ekartFacade.updateCartBadge();
  }

  trackByFn(index: number, book: Book): string {
    return book.id;
  }
}
