// This reducser can be in reducer (AppState)
import { Product } from 'src/app/models/products';
import { createEntityAdapter, EntityState, Update } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ProductActions } from './action-types';
import { update } from 'lodash';
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
  ),
  on(ProductActions.productDeleted,
    (state, action) => adapter.removeOne(action.productId , state)
  ),
  on(ProductActions.productUpdated,
    (state, action) => adapter.updateOne( action.product , state)
 ),
 on(ProductActions.productAdded,
  (state, action) => adapter.addOne( action.product , state)
)
);

export const {
  selectAll
} = adapter.getSelectors() ;
