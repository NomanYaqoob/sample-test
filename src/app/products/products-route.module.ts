import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ItemDetailComponent } from './pages/item-detail/item-detail.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'category/beverages',
    pathMatch: 'full'
  },
  {
    path: 'category/:name',
    component: ProductsComponent,
  },
  {
    path: 'product-detail/:slug',
    component: ItemDetailComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRouteModule { }
