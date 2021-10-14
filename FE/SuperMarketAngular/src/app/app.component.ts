import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from './services/loginService.service';
import { Store } from './services/store.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  
  public userLoggedIn!: boolean;
  public subscription!: Subscription;

  constructor(
    private loginService: LoginService ,
    private router: Router,
    private store:Store
  ) {  }


  // @Input('viewHeader')viewHeader!: boolean;

  @ViewChild('viewHeader', { static: false }) viewHeader: boolean = true; // to pass local refernce to out of compnent

   ngOnInit(): void {
    if(this.router.url == "/login"){
      this.viewHeader = false ;
    } 
    this.viewHeader = true ;
    console.log("ViewHeader: "+this.router.url) ;
    this.store.init() ;
    // this.loginService.isLoggedIn.subscribe(value => { value ? this.router.navigate(['./products']) : this.router.navigate(['/login']); });  
        // get the current value
    this.subscription = this.loginService.getLoggedIn().subscribe(value => {
      this.userLoggedIn = value;
  });
  }
  ngOnDestroy(): void {
    if(this.subscription){
        this.subscription.unsubscribe();
    }
 
 }
  // viewHeader = false ;
  btnName = 'SuperMarketAngular';

  // noHeader()
  // {
  //   this.viewHeader = false
  //   console.log("test:  " , this.viewHeader)
  // }

}
 
