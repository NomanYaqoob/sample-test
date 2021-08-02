import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../core/interfaces/shared.interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) { }


  getProductByCategory(category: string): Observable<Array<Item>> {
    return this.http.get<Array<Item>>(`products?categorySlug=${category}&per_page=25&page=1`);
  }

  getProductBySlug(slug: string): Observable<Item> {
    return this.http.get<Item>(`products?includeGroupSlugs[]=${slug}&per_page=25&page=1`).pipe(
      map(response => response[0])
    )
  }

}
