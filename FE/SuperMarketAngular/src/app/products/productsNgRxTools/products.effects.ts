import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { ProductActions } from './action-types';
import { allProductsLoaded } from './products.action';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductActions.loadAllProducts),
      concatMap(action => this.productsService.getAllProducts()), // ensure to that only one request at a time to the backend
      map((products) => allProductsLoaded({ products })) ,  // new action
    )
  );
  constructor(
    private action$: Actions,
    private productsService: ProductService
  ) {}
}
