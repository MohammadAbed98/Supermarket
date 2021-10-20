import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../action-types';
import { User } from '../model/User.ts';

/////////////////////////  AuthState Reducer    ////////////////////////////////

export interface AuthState {
  user: User;
}
export const initAuthState: AuthState = {
  user: {} as User,
};

export const authReducer = createReducer(
  initAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user, // when get action of login type return the user in store 
    };
  }),

  on(AuthActions.logout, (state, action) => {
    return {
      user: {} as User, //when get action of logout type empting the user in store 
    };
  })
);

//  /////////////////////////  CartState    ////////////////////////////////
// export interface CartState{

//     inCart: boolean
// }
// export const initCartState: CartState = {
//     inCart: false
// } ;

// export const cartReducer = createReducer(

//     initCartState,

//     on( CartActions.inCart, (state, action) => {
//         console.log("inCart: " , action.isInCart);
//         return {
//             inCart: action.isInCart
//         }
//     }),

//     on(CartActions.outOfCart, (state, action) => {
//         console.log("inCart: " , action.isInCart);
//         return {
//             inCart: action.isInCart

//         }
//     })
//     );
