import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";
import { Products } from "../models/products";
import { ProductService } from "../services/product.service";

@Injectable()
export class ProductResolver implements Resolve<Products>{

    constructor(private productService:ProductService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Products>  {
         
        // localhost:4200/products/angular-router-product

        const productUrl = route.paramMap.get("productUrl") ;
        console.log(productUrl)
        return this.productService.loadProductsByUrl(productUrl)
        .pipe(
            first()
        ) ;
    }

}