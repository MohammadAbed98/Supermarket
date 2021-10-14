import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/loginService.service';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../store/store';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn!: boolean 
  LevelAllowsAaccess!: string 

  constructor(private router:Router ,  private loginService: LoginService , 
    private store: Store<StoreInterface> ){
      // store.subscribe(data => {this.loggedIn = data.loggedIn.loggedIn ; this.LevelAllowsAaccess = data.LevelAllowsAaccess.LevelAllowsAaccess}) ;
      store.subscribe(data => {this.loggedIn = data.loggedIn.loggedIn}) ;

    }

  // If user is logged in, set value to true
  public setLoggedIn(value: boolean): void {
    this.loginService.setLoggedIn(value);
  }
  @Output("viewHeader") viewHeader = new EventEmitter<boolean>() ; // EventEmitter: Event pinding

  ngOnInit(): void {
  }

  LoggedIn()
  {
    // this.store.dispatch({type:'login' , LevelAllowsAaccess: 'admin'}) ;
    this.store.dispatch({type:'login'}) ;
  
    this.setLoggedIn(true)
    this.viewHeader.emit(true);
    this.router.navigate(['../products']);
    console.log(this.viewHeader);
  }

}
