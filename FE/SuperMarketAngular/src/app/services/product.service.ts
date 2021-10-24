import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/products';
import { shareReplay, tap, map, filter } from 'rxjs/operators';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url: String = 'https://localhost:5001/api';
  public products: Product[] = [];
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Array<Product>> {
    return this.http.get<any>(this.url + '/Product').pipe(
      map((result) => result.data),
      shareReplay()
    );
  }
  addProduct(product:  Partial<Product>) {    
    return this.http
      .post<any>(this.url + '/Product/', product)
      .pipe(map((res) => res.data));
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(this.url + '/Product/getProductById/' + id).pipe(
      map((result) => result.data),
      shareReplay()
    );
  }

  updateProduct(id: number, body: Partial<Product>) {
    return this.http
      .put<any>(this.url + '/Product/' + id, body)
      .pipe(map((response) => response?.data));
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http
      .delete<any>(this.url + '/Product/' + id)
      .pipe(map((response) => response?.data));
  }

  getSearchProductsList(searchStr: String): Observable<Array<Product>> {
    return this.http.get<any>(this.url + '/Product/' + searchStr).pipe(
      map((result) => result.data),
      shareReplay()
    );
    // return this.http.get<any>(this.url + "/Product/" + searchStr );
  }
}
