import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '@ecommerce/shared/services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EkartFacade } from '@ecommerce/shared/ekart-store';

@Component({
  selector: 'ecommerce-bookinfo',
  templateUrl: './bookinfo.component.html',
  styleUrls: ['./bookinfo.component.scss'],
})
export class BookinfoComponent implements OnInit, OnDestroy {
  bookInfo: Book = {
    id: '',
  };
  bookId = '';
  cartItems: Book[] = [];
  duplicateBook = false;
  errorMessage = '';
  bookSubscription: Subscription = new Subscription();
  cartItemsSubscription!: Subscription;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private ekartFacade: EkartFacade
  ) {}

  ngOnInit(): void {
    this.showBookInfo();
  }

  showBookInfo() {
    this.bookId = this.router.snapshot.queryParamMap.get('id') || '';
    this.ekartFacade.getBookInfo(this.bookId);
    this.bookSubscription = this.ekartFacade.showBookInfo$.subscribe((data) => {
      this.bookInfo = data;
    });
    this.ekartFacade.loadBookFailureInfo$.subscribe((error) => {
      this.errorMessage = error;
    });
  }

  addToCart(book: Book) {
    this.ekartFacade.addToCart(book);
    this.cartItemsSubscription = this.ekartFacade.getCartItems$.subscribe(
      (cartItems) => {
        this.cartItems = cartItems;
        this.ekartFacade.updateCartBadge();
      }
    );
  }

  buy(book: Book) {
    this.ekartFacade.addToCart(book);
    this.cartItemsSubscription = this.ekartFacade.getCartItems$.subscribe(
      (cartItems) => {
        this.cartItems = cartItems;
        this.ekartFacade.updateCartBadge();
      }
    );
    this.route.navigate(['/billing']);
  }

  ngOnDestroy() {
    if (this.bookSubscription) this.bookSubscription.unsubscribe();
    if (this.cartItemsSubscription) this.cartItemsSubscription.unsubscribe();
  }
}
