import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item, DefaultItem } from 'src/app/core/interfaces/shared.interfaces';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  slug: string;
  item: Item;
  defaultVariation: DefaultItem;
  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.slug = this.activatedRoute.snapshot.params.slug;
    this.getProductDetail();
    this.activatedRoute.queryParams.subscribe((param) => {
      if (this.item) {
        const newVariation = this.item.variations.find(x => x.id == param.selected);
        if (newVariation) {
          this.item.default = newVariation;
        }
      }
    })
  }

  getProductDetail() {
    this.productService.getProductBySlug(this.slug)
      .subscribe(item => {
        this.item = item;
        this.defaultVariation = this.item.default;
      })
  }

  addToCart() {

  }

  changeVariation(variation: DefaultItem) {
    this.router.navigate([`/product-detail/${this.item.slug}`], { relativeTo: this.activatedRoute, queryParams: { 'selected': variation.id } })
  }

}
