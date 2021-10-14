
  import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Products } from 'src/app/models/products';
import { CreateOrderComponent } from 'src/app/orders/create-order/create-order.component';
import { LoginService } from 'src/app/services/loginService.service';
import { ProductService } from 'src/app/services/product.service';
import { StoreObjects } from 'src/app/services/store.service';
import { StoreInterface } from 'src/app/store/store';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  
  loggedIn!: boolean;
    searchProductStr: String = "" ;
    @ViewChild('searchStr', { static: false }) searchStr: ElementRef | undefined; // to pass local refernce to out of compnent
  
      products!: Products[]  ;
    scrollTableClass: String = ""
  
    constructor(private productService: ProductService ,  private router: Router , 
                private loginService: LoginService , private order:CreateOrderComponent ,
                private storeObjects: StoreObjects, private storeNgrx: Store<StoreInterface> ) {}
  
    public displayCart = false
    public href: string = "";
    public item:number = 0
    product!: Products ;
    listOfProduct: Products[] = [];
    listOfProductInCart: Products[] = [];
    private setLoggedIn(value: boolean): void {
      this.loginService.setLoggedIn(value);
    }
    private setCart(value: boolean): void {
      this.loginService.setLoggedIn(value);
    }
    ngOnInit() {
  
      this.storeNgrx.subscribe(data => this.loggedIn = data.loggedIn.loggedIn ) ;

      const productsFromStore = this.storeObjects.products ;
      // this.productInCart = []
      this.href = this.router.url;
      if(this.router.url == "/orders"){
        this.displayCart = true
        this.scrollTableClass = "table-scroll"
        // this.changeIcons()
      }else{
        this.displayCart = false
      }
      // this.displayCart = false
      this.ReloadDataFromStore();
      // productsFromStore.subscribe(
      //   res => (this.listOfProduct = res),
      //   error => console.log("Error Occured retreving products from server! : ",error),
      //   () => {}
      // )  ;
      this.setLoggedIn(true) ;
    }
    changeIcons()
    {
      // this.reloadData();
      var productsTab = document.getElementById('myTable') as HTMLTableElement;
      console.log(" >> " , productsTab.rows[5].cells[5].innerHTML )
      // if(productsTab.rows[0].cells[10].getElementsByClassName("btn btn-success")[0].className == "btn btn-success")
      // productsTab.rows[0].cells[10].getElementsByClassName("btn btn-success")[0].className = "btn btn-danger"
      //   productsTab.rows[0].cells[10].getElementsByClassName("fa fa-cart-plus fa-2x")[0].className = "fa fa-cart-arrow-down fa-2x"
  
    }
  
    reloadData() {
  
        this.productService.getAllProducts().subscribe(
          res => (this.listOfProduct = res),
          error => console.log("Error Occured retreving products from server! : ",error),
          () => {}
        )  ;
        
      // this.products = this.productService.getProductsList() ;
      // this.productService.getProductsList() ;
    }
  
    deleteProduct(id:number){
      this.productService.deleteProduct(id).subscribe(
        data => {
          // this.reloadData();
          this.storeObjects.init() ;
        },
        error => console.log(error)) ;
      this.ngOnInit();
    }
    GetDetails(value:any){
      console.log(value)
    }
    daddProductToCart(id:number){
  
      var empTab = document.getElementById('myTable') as HTMLTableElement;
      var rowIndex = 0
      for(var i = 1 ; i < empTab.rows.length  ; i++ ){
  
      if(id ==   Number(empTab.rows[Number(i)].getElementsByClassName("id")[0].innerHTML))
        rowIndex = i
      }
  
   
      var productId = Number(empTab.rows[rowIndex].getElementsByClassName("id")[0].innerHTML );
      var name = empTab.rows[rowIndex].getElementsByClassName("name")[0].innerHTML;
      var price = empTab.rows[rowIndex].getElementsByClassName("price")[0].innerHTML;
      var category = empTab.rows[rowIndex].getElementsByClassName("category")[0].innerHTML;
      var production_date = empTab.rows[rowIndex].getElementsByClassName("production_date")[0].innerHTML;
      var expiry_date = empTab.rows[rowIndex].getElementsByClassName("expiry_date")[0].innerHTML;
      var number_of_items = empTab.rows[rowIndex].getElementsByClassName("number_of_items")[0].innerHTML;
      var dimentions = empTab.rows[rowIndex].getElementsByClassName("dimentions")[0].innerHTML;
      var made_in = empTab.rows[rowIndex].getElementsByClassName("made_in")[0].innerHTML;
      var active = empTab.rows[rowIndex].getElementsByClassName("active")[0].innerHTML;
      
    
      try {  
       
        if(empTab.rows[rowIndex].cells[10].getElementsByClassName("btn btn-success")[0].className == "btn btn-success")
        empTab.rows[rowIndex].cells[10].getElementsByClassName("btn btn-success")[0].className = "btn btn-danger"
        empTab.rows[rowIndex].cells[10].getElementsByClassName("fa fa-cart-plus fa-2x")[0].className = "fa fa-cart-arrow-down fa-2x"
  
        this.order.addRowToTable([productId , name , price , production_date , expiry_date  , category ,
          dimentions , made_in , active] , number_of_items )
        
      } catch (error) {
        this.order.deleteRowToTable(id)
        if (empTab.rows[rowIndex].cells[10].getElementsByClassName("btn btn-danger")[0].className == "btn btn-danger")
        empTab.rows[rowIndex].cells[10].getElementsByClassName("fa fa-cart-arrow-down fa-2x")[0].className = "fa fa-cart-plus fa-2x"
        empTab.rows[rowIndex].cells[10].getElementsByClassName("btn btn-danger")[0].className = "btn btn-success"
  
      }
    }
    updateProduct(id:number){
      // window.open("https://www.youtube.com/watch?v=W4qd5gITe8c","_self")
      // location.href = "https://www.youtube.com/watch?v=W4qd5gITe8c"
      this.router.navigate(['updateProduct', id]);
    }
  
    myFunction(){
      if(this.searchStr?.nativeElement.value == ""){
        // this.reloadData()
        this.ReloadDataFromStore() ;
      }
      else{
        // filter on data from store:
      this.storeObjects.products.subscribe(
        products => {
          this.listOfProduct = products.filter(products =>  products.name.includes(this.searchStr?.nativeElement.value)) ;
          console.log()
        }
      )
        //  fromEvent<any>(this.searchStr?.nativeElement, 'keyup').pipe(
        //   map(e=>e.target.value),
        //   // throttle(() => interval(500)),
        //   debounceTime(400),
        //   distinctUntilChanged(),
        //   switchMap(event=> this.productService.getSearchProductsList(event)) ,
        //   take(1) ,
        //   // tap(s => console.log(s))
        // ).subscribe(x=>{this.listOfProduct =x});
        // this.products = this.productService.getSearchProductsList(this.searchStr)
        // this.productService.getSearchProductsList(this.searchStr?.nativeElement.value).subscribe(product => this.listOfProduct=product) ;
        // this.productService.getSearchProductsList(this.searchProductStr).subscribe(product => this.listOfProduct=product) ;
        // console.log(this.searchStr?.nativeElement.value)
      }
    
    }
  
    ReloadDataFromStore()
    {
      this.storeObjects.products.subscribe(
        res => (this.listOfProduct = res),
        error => console.log("Error Occured retreving products from server! : ",error),
        () => {}
      )  ;
    }
       // changeIcons(productsInCartIds:any)
      // {
      //   var productsTabble = document.getElementById('myTable') as HTMLTableElement;
  
      //   for(var i = 0 ; i < productsInCartIds.length ; i++ )
      //   {
      //     for(var j = 1 ; j < productsTabble.rows.length  ; j++ )
      //     {
  
      //       if(productsInCartIds[i] ==   Number(productsTabble.rows[Number(i)].getElementsByClassName("id")[0].innerHTML))
      //       {
      //         if (productsTabble.rows[j].cells[10].getElementsByClassName("btn btn-danger")[0].className == "btn btn-danger")
      //         productsTabble.rows[j].cells[10].getElementsByClassName("fa fa-cart-arrow-down fa-2x")[0].className = "fa fa-cart-plus fa-2x"
      //         productsTabble.rows[j].cells[10].getElementsByClassName("btn btn-danger")[0].className = "btn btn-success"
      //       }
  
      //     }
      //   }
  
      // }
    
  }
  