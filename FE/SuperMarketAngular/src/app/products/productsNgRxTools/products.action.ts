import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/products';

// To loaded all products:
export const loadAllProducts = createAction(
  '[Products Resolver] Load All products'
);

// This listen to  loadAllProducts action
export const allProductsLoaded = createAction(
  '[Load Products Effect] All Products Loaded',
  props<{ products: Product[] }>()
);

export const deleteProductById = createAction(
  '[Delete Product Effect] Product delete',
  props<{ productId: number }>()
);

export const productDeleted = createAction(
  '[Delete Product Effect] Product deleted',
  props<{ productId: number }>()
);

export const updateProduct = createAction(
  '[Update Product Effect] Product Update',
  props<{ pId: number; product: Update<Product> }>()
);

export const productUpdated = createAction(
  '[Update Product Effect] Product Updated',
  props<{ product: Update<Product> }>()
);

export const addProduct = createAction(
  '[Add Product Effect] ',
  props<{ product: Product }>()
);

export const productAdded = createAction(
  '[Add Product Effect] Product Added',
  props<{ product: Product }>()
);

export const loadProductById = createAction(
  '[Product Effect] Load Product',
  props<{ productId: number }>()
);

export const loadProductByIdSuccess = createAction(
  '[Product Effect] Load Product Success',
  props<{ product: Product }>()
);
