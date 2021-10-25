import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Product } from '../models/products';
import { loadProductById } from './productsNgRxTools/products.action';
import { ProductsState } from './productsNgRxTools/products.reducer';

@Injectable()
export class ProductResolver implements Resolve<Product> {
  constructor(private store: Store<ProductsState>) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    // localhost:4200/products/angular-router-product
    const productId = parseInt('' + route.paramMap.get('id'));
    return of(this.store.dispatch(loadProductById({ productId })));
  }
}
