import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Order } from '../models/Order';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url: String = "https://localhost:5001/api"
  // /Mohammad/05651000/2020-04-24
  constructor(private http: HttpClient) { }


  addOrder(order: Object , phone:String , name:String , date:String): Observable<Object> {
    return this.http.post(this.url + "/order/"+name +"/"+ phone +"/"+ date , order );
  }

  getAllOrders():Observable<Array<Order>>
  {
    return this.http.get<any>(this.url +'/Order').pipe(
      map((result) => result.data),
      shareReplay()
    );
    
  }

  getOrderById(id: number):Observable<Order>
  {
    return this.http.get<any>(this.url + '/Order/' + id) ;
  }


}
