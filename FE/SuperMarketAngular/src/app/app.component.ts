import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { login } from './auth/auth.action';
import { AppState } from './reducer';
import { ProductService } from './services/product.service';
import { StoreObjects } from './services/store.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  
  public userLoggedIn!: boolean;
  public subscription!: Subscription;

  constructor(
    private productListService: ProductService,
    private storeObject:StoreObjects , 
    private store: Store<AppState>
  ) {  }


   ngOnInit(): void { 

    // Login action and get user from local storage (to make sure stay login when relode page without logout )
    const userProfile = localStorage.getItem("user") ;
    if(userProfile){
      this.store.dispatch(login({user: JSON.parse(userProfile)}))
    }
    this.storeObject.init() ; // To get all products and store them in store 

  }
  ngOnDestroy(): void {
    if(this.subscription){
        this.subscription.unsubscribe();
    }
 
 }
  btnName = 'SuperMarketAngular';


}
 
