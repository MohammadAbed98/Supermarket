import { ResourceProduct } from "./Resources/ProductResource";


export class Order {
  
    id: number = 0 ;
    total: number = 0 ; 
    address: string = "" ;
    listOfProducts: number = 0 ;
    products: ResourceProduct = new ResourceProduct() ;
    OrderProduct: number = 0 ;

    Products(){

    }
}

