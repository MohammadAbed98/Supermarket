import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromProducts from "./products.reducer"
import { ProductsState } from "./products.reducer";

export const selectProductsState = createFeatureSelector<ProductsState>("products") ;
export const deleteProductState = createFeatureSelector<ProductsState>("products") ;

export const selectAllProducts = createSelector(
    selectProductsState,
    fromProducts.selectAll
);


export const selectProductsByCategory2 = createSelector(
    selectAllProducts,
    products => products.filter(product => product.category == "2") 

) 

export const areProductsLoaded = createSelector(
    selectProductsState,
    state => state.allProductsLoaded 

)

export const selectedProduct = createSelector(
    selectProductsState,
    state => state.selectedProduct 

)