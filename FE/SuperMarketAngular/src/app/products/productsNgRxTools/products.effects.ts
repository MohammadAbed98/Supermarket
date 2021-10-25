import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import { Product } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';
import { ProductActions } from './action-types';
import {
  allProductsLoaded,
  loadProductByIdSuccess,
  productAdded,
  productDeleted,
  productUpdated,
} from './products.action';

@Injectable()
export class ProductsEffects {
  updatedProduct!: Update<Product>;
  addedProduct!: Product;

  loadProducts$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductActions.loadAllProducts),
      concatMap((action) => this.productsService.getAllProducts()), // ensure to that only one request at a time to the backend
      map((products) => allProductsLoaded({ products })) // new action
    )
  );

  deleteProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductActions.deleteProductById),
      concatMap((action) =>
        this.productsService.deleteProduct(action.productId)
      ), // ensure to that only one request at a time to the backend
      map((product) => productDeleted({ productId: product.id })) // new action
    )
  );

  updateProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductActions.updateProduct),
      tap(
        (ac) =>
          (this.updatedProduct = {
            id: ac.pId as number,
            changes: { ...ac.product } as {},
          })
      ),
      concatMap((action) =>
        this.productsService.updateProduct(
          action.pId as number,
          this.updatedProduct.changes
        )
      ), // ensure to that only one request at a time to the backend
      map((product) => productUpdated({ product: this.updatedProduct })) // new action
    )
  );

  addProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductActions.addProduct),
      tap((r) => (this.addedProduct = r as any)),
      concatMap((action) =>
        this.productsService.addProduct({ ...this.addedProduct })
      ), // ensure to that only one request at a time to the backend
      map((product) =>
        productAdded({
          product: { ...this.addedProduct, id: product.id } as Product,
        })
      ) // new action
    )
  );

  loadProductById$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductActions.loadProductById),
      switchMap((action) =>
        this.productsService.getProductById(action.productId)
      ), // ensure to that only one request at a time to the backend
      map((product) => loadProductByIdSuccess({ product: product })) // new action
    )
  );

  constructor(
    private action$: Actions,
    private productsService: ProductService
  ) {}
}
