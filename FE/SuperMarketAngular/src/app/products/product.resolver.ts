import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { tap } from "lodash";
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
        const pId = parseInt(''+route.paramMap.get("id")) ;
        return this.productService.getProductById(57)
        .pipe(
            first() 
        ) ;
    }
}