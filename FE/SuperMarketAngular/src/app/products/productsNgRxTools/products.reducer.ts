import { Product } from 'src/app/models/products';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ProductActions } from './action-types';

export interface ProductsState extends EntityState<Product> {
  // products: Product[] ;
  // entities: {[key:number]:Product}; //
  // ids: number[] ;
}

export const adapter = createEntityAdapter<Product>();
export const initialProductsState = adapter.getInitialState();
export const productsReducer = createReducer(
  initialProductsState,
  on(ProductActions.allProductsLoaded,
     (state, action) => adapter.addMany(action.products , state)
  )
);
