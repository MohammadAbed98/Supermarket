import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { AppState } from 'src/app/reducer';
import { loadAllProducts } from './products.action';
import { areProductsLoaded } from './products.selectors';

@Injectable()
export class ProductsResolver implements Resolve<any> {
  loading = false;
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(areProductsLoaded),
      tap((productsLoaded) => {
        if (!this.loading && !productsLoaded) { // productsLoaded flag: to Load Data (Products) Only If Needed
          this.loading = true;
          this.store.dispatch(loadAllProducts());
        }
      }),
      filter(productsLoaded => productsLoaded), // meaning: going tot termenated frist if when the productsLoaded flag is true 
      first(),
      finalize(() => (this.loading = false)) //ensure that whenever these observable either complete or errors => reset back loading to false
    );
  }
}
 

// resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//   if (!this.loading) {
//     this.loading = true;
//     return this.store.dispatch(loadAllProducts());
//   }
// }
