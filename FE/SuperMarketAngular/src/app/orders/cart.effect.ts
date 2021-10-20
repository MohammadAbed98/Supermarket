import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { AuthGuard } from "../auth/auth.guard";

@Injectable()
export class CartEffects{

    constructor( private actions$: Actions){
        actions$.subscribe( action => {
            if(action.type == '[Product in cart]'){
                const xx = action;
                // localStorage.setItem('inCart' , JSON.stringify(action.cart ) )
            }
        })
        
    }
}