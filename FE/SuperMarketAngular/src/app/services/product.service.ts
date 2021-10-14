import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/products';
import { shareReplay, tap, map, filter } from 'rxjs/operators';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: String = 'https://localhost:5001/api';
  public products: Products[] = [];
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Array<Products>> {
    return this.http.get<any>(this.url +'/Product').pipe(
      map((result) => result.data),
      shareReplay(),
    );  
  }


  loadProductsByUrl(productUrl: any)
  {
    return this.http.get<Products>(this.url +'/Product/${productUrl}')
    .pipe(
      shareReplay()
    );
  }

  //   getProductsList(): Products[] {

  //     this.getAllProducts().subscribe(
  //       res =>    console.log(this.products = res),
  //       error => console.log("Error Occured retreving products from server! : ",error),
  //       () => {}
  //     )  ;
  
  //     // console.log(" >>>> 5555" , this.products);
    

  //   return this.products;
  // }

  addProduct(product: Products): Observable<Object> {
    console.log("Product: ", product )
    return this.http.post(this.url + "/Product/" , product );
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(this.url + "/Product/getProductById/" + id ).pipe(
      map((result) => result.data),
      shareReplay()
    ); ;
  }



  updateProduct(id: number, product: Products): Observable<Object> {
    return this.http.put<Products>(this.url + "/Product/" + id ,  product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<Products>(this.url+"/Product/"+id);
  }

  getSearchProductsList(searchStr: String): Observable<Array<Products>> {

    return this.http.get<any>(this.url +'/Product/'  + searchStr ).pipe(
      map((result) => result.data),
      shareReplay()
    );
    // return this.http.get<any>(this.url + "/Product/" + searchStr );
  }

}
