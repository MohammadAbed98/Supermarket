import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { Order } from 'src/app/models/Order';
import { OrdersService } from 'src/app/services/orders.service';
 
@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
  providers:[LoginComponent]
})
export class OrdersListComponent implements OnInit {


  constructor(private orderService:OrdersService ) { 
 
  }
ordersList:Order[] = [] ;

  ngOnInit(): void {
  }



  getAllOrders()
  {
    this.orderService.getAllOrders().subscribe(
      res => {(this.ordersList = res); console.log(res)}
    ) ;

//     this.orderService.getAllOrders().subscribe(
//         orders => {
//           this.ordersListFilter = orders.filter(order => order.total > 20) ;
//         }
//       ) ;
// console.log( " All Orders >>" , this.ordersList)
// console.log( " > 20 >>" , this.ordersListFilter)
  }

  getOrderById(id:number)
  {
    this.orderService.getOrderById(id).subscribe(
      res => {console.log(res)}
    ) ;
  }

  Subjects()
  {
    // const subject = new Subject() ;
    // const series = subject.asObservable() ;

    // series.subscribe(val => console.log("early sub: "+val)) ;

    // subject.next(1) ;
    // subject.next(2) ;
    // subject.next(3) ;
    // // subject.complete() ;
    
    // setTimeout(() => {
    //   series.subscribe(val => console.log("late sub: "+val));
    //   subject.next(4) ;
    // } , 3000)

    // console.log("****************************************")

    // const bSubject = new BehaviorSubject(0) ;
    // const series2 = bSubject.asObservable() ;

    // bSubject.subscribe(val => console.log("early sub: "+val)) ;

    // bSubject.next(1) ;
    // bSubject.next(2) ;
    // bSubject.next(3) ;
    // // subject.complete() ;
    
    // setTimeout(() => {
    //   series2.subscribe(val => console.log("late sub: "+val));
    //   bSubject.next(4) ;
    // } , 3000)

    // console.log("****************************************")

    // const ASubject = new AsyncSubject() ;
    // const series3 = ASubject.asObservable() ;
    // series3.subscribe(val => console.log("early sub: "+val)) ;

    // ASubject.next(1) ;
    // ASubject.next(2) ;
    // ASubject.next(3) ;
    // // ASubject.complete() ;
    
    // setTimeout(() => {
    //   series3.subscribe(val => console.log("late sub: "+val));
    //   // ASubject.next(4) ;
    // } , 3000)

    // console.log("****************************************")

    // const RSubject = new ReplaySubject() ;
    // const series4 = RSubject.asObservable() ;
    // series4.subscribe(val => console.log("early sub: "+val)) ;

    // RSubject.next(1) ;
    // RSubject.next(2) ;
    // RSubject.next(3) ;
    // // ASubject.complete() ;
    
    // setTimeout(() => {
    //   series4.subscribe(val => console.log("late sub: "+val));
    //   // ASubject.next(4) ;
    // } , 3000)
  }
}
