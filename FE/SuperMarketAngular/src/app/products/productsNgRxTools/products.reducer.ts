// This reducser can be in reducer (AppState)
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { compareProducts, Product } from 'src/app/models/products';
import { ProductActions } from './action-types';
export interface ProductsState extends EntityState<Product> {
  allProductsLoaded: boolean;
  selectedProduct: Product;
}

export const adapter = createEntityAdapter<Product>({
  sortComparer: compareProducts, // Sort data by id
});
export const initialProductsState = adapter.getInitialState({
  allProductsLoaded: false,
  selectedProduct: {},
});

export const productsReducer = createReducer(
  initialProductsState,
  on(ProductActions.allProductsLoaded, (state, action) =>
    adapter.addMany(action.products, { ...state, allProductsLoaded: true })
  ),
  on(ProductActions.productDeleted, (state, action) =>
    adapter.removeOne(action.productId, state)
  ),
  on(ProductActions.productUpdated, (state, action) =>
    adapter.updateOne(action.product, state)
  ),
  on(ProductActions.productAdded, (state, action) =>
    adapter.addOne(action.product, state)
  ),
  on(ProductActions.loadProductByIdSuccess, (state, action) => {
    return { ...state, selectedProduct: action.product };
  })
);

export const { selectAll } = adapter.getSelectors();
