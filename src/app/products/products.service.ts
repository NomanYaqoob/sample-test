import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Item, PagingConfig } from '../core/interfaces/shared.interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) { }


  getProductByCategory(category: string, config: PagingConfig): Observable<Array<Item>> {
    const params = this.getQueryParams({ ...config, categorySlug: category });
    return this.http.get<Array<Item>>(`products`, {
      params
    });
  }

  getProductBySlug(slug: string): Observable<Item> {
    return this.http.get<Item>(`products?includeGroupSlugs[]=${slug}&per_page=25&page=1`).pipe(
      map(response => response[0])
    )
  }

  getDefaultPagingConf(): PagingConfig {
    return {
      page: 1,
      per_page: 25
    }
  }

  getQueryParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      httpParams = httpParams.set(key, params[key]);
    });
    return httpParams;
  }

}
