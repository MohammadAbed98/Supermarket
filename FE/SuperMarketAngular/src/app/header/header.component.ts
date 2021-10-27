import { state } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { logout } from '../auth/auth.action';
import { isLoggedIn, isLoggedOut } from '../auth/auth.selector';
import { AppState } from '../reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 

  isLoggedIn!: Observable<boolean> ;
  isLoggedOut!: Observable<boolean>;
  constructor( private store: Store<AppState>, 
     private router: Router , 
     private appStore: Store<AppState>
     ) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {}) ;
    this.isLoggedIn = this.store
    .pipe(
      select(isLoggedIn) 
    );
    // this.isLoggedOut = this.store
    // .pipe(
    //  select(isLoggedOut)
    // );
  }

  Logout(){
    // throw logout action 
    const newLogoutAction = logout() ; 
    this.appStore.dispatch(newLogoutAction) ;
  
  }

}
