import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userLoggedIn = new BehaviorSubject(false);

  getLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }
  getLoggedInValue(): boolean {
    return this.userLoggedIn.getValue();
  }

  setLoggedIn(val: boolean) {
    this.userLoggedIn.next(val);
  }
  constructor(private router: Router) {}

  login(){

        this.router.navigate(['../products']);
      
    }

}
