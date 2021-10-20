import {  ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { cartReducer } from '../reducer';
import { CartEffects } from './cart.effect';



@NgModule({
  declarations: [],
  imports: [  
    CommonModule,
    ReactiveFormsModule,
    // RouterModule.forChild([{path: '', component: ProductListComponent}]),
    StoreModule.forFeature('cart', cartReducer),
    EffectsModule.forFeature([CartEffects]) ,
    
  ],
//   exports:[ProductListComponent]

})
export class CartModule {
  static forRoot(): ModuleWithProviders<CartModule> {
      return {
          ngModule: CartModule,
          providers: [
          ]
      }
  }
 }
