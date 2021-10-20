import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { noop } from 'lodash';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/reducer';
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
    private fb: FormBuilder,  
    private auth: AuthService ,
    private appStore: Store<AppState>

  ) {
    this.form = fb.group({
      email: ['test@appia.com', [Validators.required]],
      password: ['test', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  LoggedIn() {
    this.router.navigate(['../products']);

    // Start Auth NgRx Exp:
    const val = this.form.value;
    this.auth.login(val.email , val.password)
    .pipe(
      tap(user => {
        const newLoginAction = login({user}) ; // Create action type of login  
        this.appStore.dispatch(newLoginAction) ; // dispatch this action, the dispatch will throw action to effect or reducer (depends on app) 
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
