import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '@ecommerce/shared/services';
import { Subscription } from 'rxjs';
import { EkartFacade } from '@ecommerce/shared/ekart-store';

@Component({
  selector: 'ecommerce-mycollection',
  templateUrl: './mycollection.component.html',
  styleUrls: ['./mycollection.component.scss'],
})
export class MycollectionComponent implements OnInit, OnDestroy {
  public bookCollection!: Book[];
  public showDelete = false;
  collectionItemsSubscription!: Subscription;

  constructor(private ekartFacade: EkartFacade) {}

  ngOnInit(): void {
    this.showCollection();
  }

  showCollection() {
    this.collectionItemsSubscription = this.ekartFacade.getCollectionBooks$.subscribe(
      (booksCollection) => {
        this.bookCollection = booksCollection;
      }
    );
  }

  ngOnDestroy() {
    this.collectionItemsSubscription.unsubscribe();
  }
}
