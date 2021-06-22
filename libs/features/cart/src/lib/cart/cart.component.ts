import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '@ecommerce/shared/services';
import { Subscription } from 'rxjs';
import { EkartFacade } from '@ecommerce/shared/ekart-store';

@Component({
  selector: 'ecommerce-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  public cartItems: Book[] = [];
  public showDelete = true;
  public errorMessage = '';
  cartItemsSubscription!: Subscription;

  constructor(private router: Router, private ekartFacade: EkartFacade) {}

  ngOnInit(): void {
    this.displayCartItems();
  }

  displayCartItems() {
    this.cartItemsSubscription = this.ekartFacade.getCartItems$.subscribe(
      (cartItems) => {
        this.cartItems = cartItems;
      }
    );
  }

  proceedToPurchase() {
    this.router.navigate(['/billing']);
  }

  ngOnDestroy() {
    this.cartItemsSubscription.unsubscribe();
  }
}
