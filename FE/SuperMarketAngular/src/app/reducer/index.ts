import {
  ActionReducer,
  ActionReducerMap,
  createReducer,
  on,
} from '@ngrx/store';
import { CartActions } from 'src/app/orders/action-types';
import { AuthState } from '../auth/reducer';

export interface AppState {
  auth: AuthState;
  cart: CartState;
}

/////////////////////////  CartState    ////////////////////////////////
export interface CartState {
  inCart: boolean;
  dangerClasses: Map<number,string>;
}
export const initCartState: CartState = {
  inCart: false,
  dangerClasses: new Map(),
};

export const cartReducer = createReducer<any>(
  initCartState,

  on(CartActions.inCart, (state, action) => {
    return {
      inCart: action.isInCart,
      dangerClasses: action.dangerClasses,
    }
    // return (state = {
    //   ...state,
    //   inCart: action.isInCart,
    //   dangerClasses: action.dangerClasses,
    // });
  })

  // on(CartActions.outOfCart, (state, action) => {
  //   console.log('inCart: ', action.isInCart);
  //   return {
  //     inCart: action.isInCart,
  //     dangerClasses: action.dangerClasses

  //   };
  // })
);

// export const reducers: ActionReducerMap<AppState> = {
//   auth: {} as ActionReducer<AuthState, Action>
// };

//   export function logger(reducer:ActionReducer<any>)
//       : ActionReducer<any> {
//       return (state, action) => {
//           console.log("state before: ", state);
//           console.log("action", action);

//           return reducer(state, action);
//       }

//   }

// export const metaReducers: MetaReducer<AppState>[] =
//     !environment.production ? [] : [];
