import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Order } from '../models/Order';

class OrderModel
{
    total:number  = 0;
    products: number[] = [];
    address: string='';
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url: String = "https://localhost:5001/api"
  // /Mohammad/05651000/2020-04-24
  constructor(private http: HttpClient) { }


  // addOrder(order: Object , phone:String , name:String , date:String): Observable<Object> {
  //   return this.http.post(this.url + "/order/"+name +"/"+ phone +"/"+ date , order );
  // }


  addOrder(total:number , products: number[] , address:string):Observable<Order> {
    console.log("Addeddd") ;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    // const s: OrderModel = {total: 1, products:[57], address: '123'};
     return this.http.post<any>(this.url + '/Order/', {total , products , address } ,httpOptions  ).pipe(tap(x=>console.log('123')));
    // return this.http.post(this.url + "/Order/" , {total ,  products, address}  );
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

  DeleteOrderById(id: number):Observable<Order>
  {
    return this.http.delete<any>(this.url + '/Order/' + id) ;
  }


}
