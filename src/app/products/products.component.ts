import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './products.service';
import { Item, PagingConfig } from '../core/interfaces/shared.interfaces';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { map, debounceTime, filter, exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  category: string;
  items: Array<Item> = [];
  tracker: Element;
  scrollSubscription: Subscription;
  pagingConf: PagingConfig;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.category = param.name;
      this.pagingConf = this.productService.getDefaultPagingConf();
      this.getProducts(this.pagingConf).subscribe((items: Array<Item>) => {
        this.items = [];
        this.setData(items);
        if (this.tracker) {
          this.tracker.scrollTop = 0;
        }
      }, (err) => {
        console.log(err);
      });
    });
    this.activateScrollingEvent();
  }

  getProducts(pagingConf: PagingConfig): Observable<Array<Item>> {
    return this.productService.getProductByCategory(this.category, pagingConf);
  }

  setData(items: Array<Item>) {
    this.items = this.items.concat(items);
  }

  activateScrollingEvent() {
    this.tracker = document.getElementsByTagName('nz-content')[0];

    let windowYOffsetObservable = fromEvent(this.tracker, 'scroll').pipe(map(() => {
      return this.tracker.scrollTop;
    }));

    // subscribe to our Observable so that for each new item, our callback runs
    // this is our event handler
    this.scrollSubscription = windowYOffsetObservable.pipe(
      debounceTime(100),
      filter((scrollPos) => {
        let limit = this.tracker.scrollHeight - this.tracker.clientHeight;
        return limit - scrollPos <= 200;
      }),
      exhaustMap(() => {
        this.pagingConf.page += 1;
        return this.getProducts(this.pagingConf);
      })
    )
      .subscribe((items: Array<Item>) => {
        this.setData(items);
      }, (err) => {
        console.log(err);
      });
  }

  ngOnDestroy() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

}
