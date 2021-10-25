import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/products';
import { isInCart } from 'src/app/orders/cart.selector';
import { CreateOrderComponent } from 'src/app/orders/create-order/create-order.component';
// import { inCart, outOfCart } from 'src/app/orders/orders.action';
import { inCart } from 'src/app/orders/orders.action';
import { AppState } from 'src/app/reducer';
import { ProductService } from 'src/app/services/product.service';
import { StoreObjects } from 'src/app/services/store.service';
import { deleteProductById } from '../productsNgRxTools/products.action';
import { ProductsState } from '../productsNgRxTools/products.reducer';
import { selectAllProducts } from '../productsNgRxTools/products.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  searchProductStr: String = '';
  testValue = true;
  @ViewChild('searchStr', { static: false }) searchStr: ElementRef | undefined; // to pass local refernce to out of compnent

  products$!: Observable<Product[]>;
  scrollTableClass: String = '';
  constructor(
    private productService: ProductService,
    private router: Router,
    private order: CreateOrderComponent,
    private storeObjects: StoreObjects,
    private appStore: Store<AppState>,
    private appStoreProducts: Store<ProductsState>
  ) {}
  public viewHeader = true;
  public displayCart = false;
  public href: string = '';
  public item: number = 0;
  public productState = new Map() ;
  public arrOfProducts = []
  product!: Product;
  // listOfProduct: Product[] = [];
  listOfProductInCart: Product[] = [];

  ngOnInit() {
    // const productsFromStore = this.storeObjects.products;
    this.href = this.router.url;
    if (this.router.url == '/orders/creat-order') {
      this.displayCart = true;
      this.viewHeader = false;
      this.scrollTableClass = 'table-scroll';
    } else {
      this.displayCart = false;
    }
    // this.ReloadDataFromStore(); // load products from store
    this.reloadData();
    // productsFromStore.subscribe(
    //   res => (this.listOfProduct = res),
    //   error => console.log("Error Occured retreving products from server! : ",error),
    //   () => {}
    // )  ;
  }

  reloadData() {      
    
    this.products$ = this.appStoreProducts.pipe(select(selectAllProducts));

    // console.log("from Loading");
    // this.appStoreProducts.pipe(
    //   tap((r) => console.log("rrrrrrrrrr>> ",r)
    //   ) ,
    //   select(selectAllProducts)).subscribe(
    //             (error) =>
    //       console.log('Error Occured retreving products from server! : ', error),

    //   );
 
    
    // load products from database:
      // load products from database: 
    // load products from database:
    // this.productService.getAllProducts().subscribe(
    //   (res) => (this.listOfProduct = res),
    //   (error) =>t 
    //     console.log('Error Occured retreving products from server! : ', error),
    //   () => {}
    // );

    // this.products = this.productService.getProductsList() ;
    // this.productService.getProductsList() ;
  }

  deleteProduct(id: number) {
    this.appStoreProducts.dispatch(deleteProductById({ productId: id }));

    // this.productService.deleteProduct(id).subscribe(
    //   (data) => {
    //     // this.reloadData();
    //     this.storeObjects.init();
    //   },
    //   (error) => console.log(error)
    // );
  }
  GetDetails(value: any) {}

  daddProductToCart(id: number) {
    // id: The productId we want to add to cart
    var empTab = document.getElementById('myTable') as HTMLTableElement;
    var rowIndex = 0;
    for (var i = 1; i < empTab.rows.length; i++) {
      // loop on products table to get row we want to add to cart
      if (
        id ==
        Number(empTab.rows[Number(i)].getElementsByClassName('id')[0].innerHTML)
      )
        rowIndex = i;
      // break ;
    }
    var productId = Number(
      empTab.rows[rowIndex].getElementsByClassName('id')[0].innerHTML
    );
    var name =
      empTab.rows[rowIndex].getElementsByClassName('name')[0].innerHTML;
    var price =
      empTab.rows[rowIndex].getElementsByClassName('price')[0].innerHTML;
    var category =
      empTab.rows[rowIndex].getElementsByClassName('category')[0].innerHTML;
    var production_date =
      empTab.rows[rowIndex].getElementsByClassName('production_date')[0]
        .innerHTML;
    var expiry_date =
      empTab.rows[rowIndex].getElementsByClassName('expiry_date')[0].innerHTML;
    var number_of_items =
      empTab.rows[rowIndex].getElementsByClassName('number_of_items')[0]
        .innerHTML;
    var dimentions =
      empTab.rows[rowIndex].getElementsByClassName('dimentions')[0].innerHTML;
    var made_in =
      empTab.rows[rowIndex].getElementsByClassName('made_in')[0].innerHTML;
    var active =
      empTab.rows[rowIndex].getElementsByClassName('active')[0].innerHTML;

    try {
      if (
        empTab.rows[rowIndex].cells[10].getElementsByClassName(
          'btn btn-success'
        )[0].className == 'btn btn-success'
      )
        empTab.rows[rowIndex].cells[10].getElementsByClassName(
          'btn btn-success'
        )[0].className = 'btn btn-danger';
      empTab.rows[rowIndex].cells[10].getElementsByClassName(
        'fa fa-cart-plus fa-2x'
      )[0].className = 'fa fa-cart-arrow-down fa-2x';

      this.order.addRowToTable(
        [
          productId,
          name,
          price,
          production_date,
          expiry_date,
          category,
          dimentions,
          made_in,
          active,
        ],
        number_of_items
      );
      this.productState.set(id, 'btn btn-danger');
      const newCartAction = inCart({
        isInCart: true,
        dangerClasses: this.productState,
      });
      this.appStore.dispatch(newCartAction);
    } catch (error) {
      this.order.deleteRowToTable(id);
      if (
        empTab.rows[rowIndex].cells[10].getElementsByClassName(
          'btn btn-danger'
        )[0].className == 'btn btn-danger'
      )
        empTab.rows[rowIndex].cells[10].getElementsByClassName(
          'fa fa-cart-arrow-down fa-2x'
        )[0].className = 'fa fa-cart-plus fa-2x';
      empTab.rows[rowIndex].cells[10].getElementsByClassName(
        'btn btn-danger'
      )[0].className = 'btn btn-success';

      this.productState.delete(id);
      const newCartAction = inCart({
        isInCart: false,
        dangerClasses: this.productState,
      });
      this.appStore.dispatch(newCartAction);

      // const newCartAction = outOfCart({ isInCart: false , dangerClasses:this.productState });
      // this.appStore.dispatch(newCartAction);
    }
    // this.initIcons(55);
  }

  getProductsByName() {
    return this.products$.pipe(
      map((projects) =>
        projects.filter((products) =>
          products.name.includes(this.searchStr?.nativeElement.value)
        )
      )
    );
  }

  myFunction() {
    if (this.searchStr?.nativeElement.value == '') {
      this.reloadData();
      // this.ReloadDataFromStore();
    } else {
      // filter on data from store:
      this.storeObjects.products.subscribe((products) => {
        this.products$.subscribe(
          (products) => (this.products$ = this.getProductsByName())
        );
      });
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

  // myFunction() {
  //   if (this.searchStr?.nativeElement.value == '') {
  //     // this.reloadData()
  //     this.ReloadDataFromStore();
  //   } else {
  //     // filter on data from store:
  //     this.storeObjects.products.subscribe((products) => {
  //       this.listOfProduct = products.filter((products) =>
  //         products.name.includes(this.searchStr?.nativeElement.value)
  //       );
  //     });
  //     //  fromEvent<any>(this.searchStr?.nativeElement, 'keyup').pipe(
  //     //   map(e=>e.target.value),
  //     //   // throttle(() => interval(500)),
  //     //   debounceTime(400),
  //     //   distinctUntilChanged(),
  //     //   switchMap(event=> this.productService.getSearchProductsList(event)) ,
  //     //   take(1) ,
  //     //   // tap(s => console.log(s))
  //     // ).subscribe(x=>{this.listOfProduct =x});
  //     // this.products = this.productService.getSearchProductsList(this.searchStr)
  //     // this.productService.getSearchProductsList(this.searchStr?.nativeElement.value).subscribe(product => this.listOfProduct=product) ;
  //     // this.productService.getSearchProductsList(this.searchProductStr).subscribe(product => this.listOfProduct=product) ;
  //     // console.log(this.searchStr?.nativeElement.value)
  //   }
  // }

  // ReloadDataFromStore() {
  //   this.storeObjects.products.subscribe(
  //     (res) => (this.listOfProduct = res),
  //     (error) =>
  //       console.log('Error Occured retreving products from server! : ', error),
  //     () => {}
  //   );
  // }

  // initIcons(id: number) {
  //   var isInCartTemp = new Map<any, any>();
  //   this.appStore
  //     .select(isInCart)
  //     .subscribe((result) => (isInCartTemp = result.dangerClasses));
  //   if (isInCartTemp.get(id)) {
  //     this.testValue = false;
  //   } else {
  //     this.testValue = true;
  //   }
  //   console.log(' >>>>>> ', isInCartTemp);
  // }
  // changeIcons() {
  //   // this.reloadData();
  //   var productsTab = document.getElementById('myTable') as HTMLTableElement;
  //   console.log(' >> ', productsTab.rows[5].cells[5].innerHTML);
  //   // if(productsTab.rows[0].cells[10].getElementsByClassName("btn btn-success")[0].className == "btn btn-success")
  //   // productsTab.rows[0].cells[10].getElementsByClassName("btn btn-success")[0].className = "btn btn-danger"
  //   //   productsTab.rows[0].cells[10].getElementsByClassName("fa fa-cart-plus fa-2x")[0].className = "fa fa-cart-arrow-down fa-2x"
  // }
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
