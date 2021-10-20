import { createAction, props } from "@ngrx/store";

export const inCart = createAction(
    "[Product in cart]",
    props<{isInCart: boolean , dangerClasses: {} }>()
); 

// export const outOfCart = createAction(
//     "[Product out of cart]",
//     props<{isInCart: boolean , dangerClasses: "btn btn-danger" }>()
//     ); 
