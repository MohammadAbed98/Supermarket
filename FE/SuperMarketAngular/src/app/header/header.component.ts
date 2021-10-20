import { state } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { logout } from '../auth/auth.action';
import { isLoggedIn, isLoggedOut } from '../auth/auth.selector';
import { AppState } from '../reducer';
import { StoreInterface } from '../store/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  loggedIn!: boolean;

  isLoggedIn!: Observable<boolean> ;
  loading = true ;
  isLoggedOut!: Observable<boolean>;
  constructor(private storeNgrx: Store<StoreInterface> ,
     private store: Store<AppState>, 
     private router: Router , 
     private appStore: Store<AppState>
     ) { }

  ngOnInit(): void {
    this.storeNgrx.subscribe(data => this.loggedIn = data.loggedIn.loggedIn ) ;
    this.router.events.subscribe(event => {}) ;
    this.isLoggedIn = this.store
    .pipe(
      // select(x =>  !!x.auth.user) 
      select(isLoggedIn) 
    );
    this.isLoggedOut = this.store
    .pipe(
     select(isLoggedOut)
    //  select(x =>  !x.auth.user)
    );
    // this.store.subscribe(state => console.log("Store Value: ", state))
  }

  Logout(){
    const newLoginAction = logout() ; 
    this.appStore.dispatch(newLoginAction) ;
  
  }

}
