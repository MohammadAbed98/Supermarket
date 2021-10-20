import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AuthActions } from './action-types';
import { AuthGuard } from './auth.guard';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {
    // actions$.subscribe( action => {
    //     if(action.type == '[Login Page] User Login'){
    //         localStorage.setItem('user' , JSON.stringify((action as any).user ) )
    //     }
    // })
  }

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap((action) => {
          localStorage.setItem('user', JSON.stringify(action.user));
        })
      ),
    { dispatch: false }
  );
}
