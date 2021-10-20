import { createFeatureSelector, createSelector } from "@ngrx/store";
import { tap } from "rxjs/operators";
import { AppState, CartState } from "../reducer";

// export const selectFeature = (state: AppState) => state.cart;
export const selectFeature = (state: AppState) => state;

export const selectCartState = createFeatureSelector<CartState>("cart") ;

export const isInCart = createSelector(
    selectFeature ,  // OR: selectCartState
    // selectCartState,
    // cart => cart.cart
   (cart) => cart.cart
) ;

// export const isOutOfCart = createSelector(
//     isInCart,
//     inCart => inCart,
// ) ;