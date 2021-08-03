import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { ProductsComponent } from './products.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { RewardComponent } from './components/reward/reward.component';

// services
import { ProductsService } from './products.service';

// modules
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ProductsRouteModule } from './products-route.module';
import { ItemDetailComponent } from './pages/item-detail/item-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductsComponent,
    ItemCardComponent,
    RewardComponent,
    ItemDetailComponent,
  ],
  imports: [
    CommonModule,
    ProductsRouteModule,
    NzCardModule,
    NzGridModule,
    NzSelectModule,
    NzLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ProductsService]
})
export class ProductsModule { }
