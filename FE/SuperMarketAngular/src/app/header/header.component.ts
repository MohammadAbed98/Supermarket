import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../store/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  loggedIn!: boolean;


  showHeader: boolean = true
  constructor(private storeNgrx: Store<StoreInterface>) { }

  ngOnInit(): void {
    this.storeNgrx.subscribe(data => this.loggedIn = data.loggedIn.loggedIn ) ;
    console.log(" >>>>>>>>> "+this.loggedIn) ;

  }

}
