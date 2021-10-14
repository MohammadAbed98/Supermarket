import { HttpClient } from "@angular/common/http";
import {  Component, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Products } from "../models/products";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: 'root'  
})

export class StoreObjects {

    private subject = new BehaviorSubject<Products[]>([]) ;
    products: Observable<Products[]> = this.subject.asObservable();
    url: String = 'https://localhost:5001/api';

    constructor(private productService:ProductService){

    }
    init(){ 
      const products =  this.productService.getAllProducts().subscribe(products => this.subject.next(products)) ;
    }
    
}