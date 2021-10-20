import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/User.ts';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  url: String = "https://localhost:5001/api/Auth"

  login(email:string, password:string): Observable<User> {
    return this.http.post<User>(this.url + '/login/' + email + "/" + password, {email,password});
}
}
