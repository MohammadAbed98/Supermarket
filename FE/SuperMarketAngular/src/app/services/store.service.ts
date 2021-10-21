import { HttpClient } from "@angular/common/http";
import {  Component, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Product } from "../models/products";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: 'root'  
})

export class StoreObjects {

    private subject = new BehaviorSubject<Product[]>([]) ;
    products: Observable<Product[]> = this.subject.asObservable();
    // url: String = 'https://localhost:5001/api';

    constructor(private productService:ProductService){
    }
    init(){ 
      const products =  this.productService.getAllProducts().subscribe(products => this.subject.next(products)) ;
    }
    
}