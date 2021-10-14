import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User.ts';
import { LoginService } from '../services/loginService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router ,  private loginService: LoginService ){}
  // If user is logged in, set value to true
  public setLoggedIn(value: boolean): void {
    this.loginService.setLoggedIn(value);
  }
  @Output("viewHeader") viewHeader = new EventEmitter<boolean>() ; // EventEmitter: Event pinding

  ngOnInit(): void {
  }

  LoggedIn()
  {
    this.setLoggedIn(true)
    this.viewHeader.emit(true);
    this.router.navigate(['../products']);
    console.log(this.viewHeader);
  }

}
