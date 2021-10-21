import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HeaderModule } from '../header/header.module';
import { ProductsModule } from '../products/products.module';
import { cartReducer } from '../reducer';
import { OrdersService } from '../services/orders.service';
import { CartEffects } from './cart.effect';
import { CreateOrderComponent } from './create-order/create-order.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersRoutingModule } from './orders-routing.module';


@NgModule({
  declarations: [CreateOrderComponent, OrdersListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsModule,
    OrdersRoutingModule,
    HeaderModule,
    // RouterModule.forChild([{path: '', component: ProductListComponent}]),
    StoreModule.forFeature('cart', cartReducer),
    EffectsModule.forFeature([CartEffects]),
  ],
  exports: [CreateOrderComponent, OrdersListComponent],
})
export class CartModule {
  static forRoot(): ModuleWithProviders<CartModule> {
    return {
      ngModule: CartModule,
      providers: [OrdersService],
    };
  }
}
