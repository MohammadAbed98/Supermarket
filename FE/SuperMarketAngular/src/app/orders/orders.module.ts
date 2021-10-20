import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from '../reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    StoreModule.forFeature('cart', cartReducer),

  ]
})
export class OrdersModule { }
