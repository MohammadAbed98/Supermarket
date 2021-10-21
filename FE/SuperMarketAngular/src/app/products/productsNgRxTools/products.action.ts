import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/models/products";


// To loaded all products: 
export const loadAllProducts = createAction(
    "[Products Resolver] Load All products"
);

// This listen to  loadAllProducts action 
export const allProductsLoaded = createAction(
    "[Load Products Effect] All Products Loaded",
    props<{products: Product[]}>()
);

