import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HeaderModule } from '../header/header.module';
import { CreateOrderComponent } from '../orders/create-order/create-order.component';
import { OrdersService } from '../services/orders.service';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsEffects } from './productsNgRxTools/products.effects';
import { productsReducer } from './productsNgRxTools/products.reducer';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ReactiveFormsModule } from '@angular/forms';

// import { ProductsRoutingModule } from '../products-routind.module';

// export const productsRoutes: Routes = [
//   {
//     path: '',
//     component: ProductListComponent,
//     resolve: {
//       products: ProductsResolver
//     }
//   }
// ]

@NgModule({
  declarations: [
    UpdateProductComponent,
    AddProductComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    HeaderModule,
    EffectsModule.forFeature([ProductsEffects]),
    StoreModule.forFeature('products', productsReducer),
    ReactiveFormsModule
  ],
  exports: [
    UpdateProductComponent,
    AddProductComponent,
    ProductListComponent,
    RouterModule,
  ],
  providers: [OrdersService, CreateOrderComponent],
})
export class ProductsModule {}
