import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { noop } from 'lodash';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/reducer';
import { StoreInterface } from '../../store/store';
import { AuthActions } from '../action-types';
import { login } from '../auth.action';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loggedIn!: boolean;
  LevelAllowsAaccess!: string;

  form!: FormGroup;
  constructor(
    private router: Router,
    private store: Store<StoreInterface>,
    private fb: FormBuilder,  
    private auth: AuthService ,
    private appStore: Store<AppState>

  ) {
    store.subscribe((data) => {
      this.loggedIn = data.loggedIn.loggedIn;
    });

    this.form = fb.group({
      email: ['test@appia.com', [Validators.required]],
      password: ['test', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  LoggedIn() {
    // this.store.dispatch({type:'login' , LevelAllowsAaccess: 'admin'}) ;
    this.store.dispatch({ type: 'login' });
    this.router.navigate(['../products']);

    
    const val = this.form.value;
    this.auth.login(val.email , val.password)
    .pipe(
      tap(user => {
        const newLoginAction = login({user}) ; 
        this.appStore.dispatch(newLoginAction) ;
        console.log(login({user})) ,
        this.router.navigateByUrl('/products') ;
      })
    )
    .subscribe(
      noop,
      () => alert('Login Failed')
    )
  }
}
