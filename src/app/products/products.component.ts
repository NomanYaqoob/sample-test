import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './products.service';
import { Item } from '../core/interfaces/shared.interfaces';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  category: string;
  items: Array<Item>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.category = param.name;
      this.getProducts();
    })
  }

  getProducts() {
    this.productService.getProductByCategory(this.category)
      .subscribe((items: Array<Item>) => {
        this.items = items;
      });
  }

}
