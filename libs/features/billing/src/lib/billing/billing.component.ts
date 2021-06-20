import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { DialogComponent } from '@ecommerce/shared/dialog';
import { Book } from '@ecommerce/shared/services';
import { EkartFacade } from '@ecommerce/shared/ekart-store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ecommerce-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit, OnDestroy {
  billingForm: FormGroup;
  imagePath: string;
  booksCollection: Book[] = [];
  cartItems: Book[] = [];
  matDialogRef!: MatDialogRef<DialogComponent>;
  cartItemsSubscription!: Subscription;
  collectionItemsSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private ekartFacade: EkartFacade
  ) {
    this.imagePath = 'https://images.app.goo.gl/sizfN6GMeUrg7nYa8';
    this.billingForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.cartItemsSubscription = this.ekartFacade.getCartItems$.subscribe(
      (cartItems) => {
        this.cartItems = cartItems;
      }
    );
  }

  submit() {
    this.ekartFacade.addToCollection(this.cartItems);
    this.collectionItemsSubscription = this.ekartFacade.getCollectionBooks$.subscribe(
      (booksCollection) => {
        this.booksCollection = booksCollection;
      }
    );
    this.ekartFacade.resetCartItems();
    this.ekartFacade.updateCartBadge();
    this.OpenModal('your order placed successfully');
  }

  OpenModal(message: string) {
    this.matDialogRef = this.matDialog.open(DialogComponent, {
      data: { message },
    });
  }

  ngOnDestroy() {
    this.cartItemsSubscription.unsubscribe();
    this.collectionItemsSubscription?.unsubscribe();
  }
}
