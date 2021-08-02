import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/core/interfaces/shared.interfaces';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input('item') item: Item;

  constructor(private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  openItem() {
    this.router.navigate([`product-detail/${this.item.slug}`], { queryParams: { 'selected': this.item.variations[0].id } });
  }

}
