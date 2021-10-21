import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { tap } from "lodash";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";
import { Product } from "../models/products";
import { ProductService } from "../services/product.service";

@Injectable()
export class ProductResolver implements Resolve<Product>{

    constructor(private productService:ProductService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Product>  {
        // localhost:4200/products/angular-router-product
        const pId = parseInt(''+route.paramMap.get("id")) ;
        return this.productService.getProductById(57)
        .pipe(
            first() 
        ) ;
    }
}