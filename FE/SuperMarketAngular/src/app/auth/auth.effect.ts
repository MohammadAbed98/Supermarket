import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AuthActions } from './action-types';
import { AuthGuard } from './auth.guard';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions , private router: Router) {
    // actions$.subscribe( action => {
    //     if(action.type == '[Login Page] User Login'){
    //         localStorage.setItem('user' , JSON.stringify((action as any).user ) )
    //     }
    // })
  }

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login), // (Filtering) Convert action type from any to AuthActions.login
        tap((action) => {
          localStorage.setItem('user', JSON.stringify(action.user)); // store in local storage on the browser 
        })
      ),
    { dispatch: false } // To prevent an infinit loop by the above side effect, because it is observable and will stay open and throw login action continuaslly 
  );

  
  logout$ = createEffect( () => 
  this.actions$
  .pipe(
    ofType(AuthActions.logout),
    tap(action => {
      localStorage.removeItem('user') ; // remove user from local storage 
      this.router.navigateByUrl('/login') ; // if not logged in move to login page 

    })
  ),
  {dispatch: false}
  ) ;

}
