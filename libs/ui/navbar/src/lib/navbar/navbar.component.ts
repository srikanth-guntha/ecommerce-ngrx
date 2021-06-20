import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EkartFacade } from '@ecommerce/shared/ekart-store';

@Component({
  selector: 'ecommerce-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public navList: string[] = [];
  public badgeNumber!: number;
  badgeSubscription: Subscription = new Subscription();

  constructor(private ekartFacade: EkartFacade) {}

  ngOnInit(): void {
    this.navList = ['search', 'cart', 'collection'];
    this.badgeSubscription = this.ekartFacade.getBadgeNumber$.subscribe(
      (badgeNumber) => {
        this.badgeNumber = badgeNumber;
      }
    );
  }

  ngOnDestroy() {
    this.badgeSubscription.unsubscribe();
  }
}
