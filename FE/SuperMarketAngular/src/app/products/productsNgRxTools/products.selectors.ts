import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromProducts from "./products.reducer"
import { ProductsState } from "./products.reducer";

export const selecProductState = createFeatureSelector<ProductsState>("products") ;
export const deleteProductState = createFeatureSelector<ProductsState>("products") ;

export const selectAllProducts = createSelector(
    selecProductState,
    fromProducts.selectAll
);


export const selectProductsByCategory2 = createSelector(
    selectAllProducts,
    products => products.filter(product => product.category == "2") 

) 