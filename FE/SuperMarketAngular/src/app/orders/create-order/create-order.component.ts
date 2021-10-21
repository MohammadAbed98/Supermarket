import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products';
import { OrdersService } from 'src/app/services/orders.service';
import { StoreObjects } from 'src/app/services/store.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent implements OnInit {
  fName: String = '';
  showTable = false;
  listOfProduct: Product[] = [];
  // productInCart = new Map()
  // productInCart = Number[]
  constructor(
    private order: OrdersService,
    private storeObjects: StoreObjects
  ) {}

  ngOnInit() {
    this.showTable = false;
  }

  showProductsTable(value: boolean) {
    this.showTable = value;
    // this.product.changeIcons
  }

  addRowToTable(arr: any, maxNumberOfIyems: string) {
    var productsTable = document.getElementById(
      'productsInCartTable'
    ) as HTMLTableElement;
    // var row = productsTable.insertRow(1).appendChild(row2) ;
    var row, cell;
    row = productsTable.insertRow(productsTable.rows.length);
    for (var i = 0; i < arr.length; i++) {
      cell = row.insertCell(i);
      if (i == 0) cell.className = 'id';
      cell.innerHTML = '' + arr[i];
      if (i == arr.length - 1) {
        var Input = document.createElement('input');
        Input.type = 'number';
        Input.value = '1';
        Input.min = '1';
        Input.max = maxNumberOfIyems;
        Input.style.width = '40%';
        cell = row.insertCell(i + 1);
        cell.appendChild(Input);
      }
    }
  }
  deleteRowToTable(id: number) {
    // var productsTable = document.getElementById('productsInCartTable') as HTMLTableElement;
    var productsTable = document.getElementById(
      'productsInCartTable'
    ) as HTMLTableElement;
    var rowIndex = 0;
    for (var i = 1; i < productsTable.rows.length; i++) {
      try {
        if (
          id ==
          Number(
            productsTable.rows[Number(i)].getElementsByClassName('id')[0]
              .innerHTML
          )
        ) {
          rowIndex = i;
        }
      } catch (error) {}
    }

    productsTable.deleteRow(rowIndex);
  }

  ApplyOrder() {
    var pp: Product[] = [];
    this.storeObjects.products.subscribe(
      (res) => (pp = res),
      (error) =>
        console.log('Error Occured retreving products from server! : ', error),
      () => {}
    );
    var productsTable = document.getElementById(
      'productsInCartTable'
    ) as HTMLTableElement;

    var total = 0;
    var productPrice;
    var productInCart = [];
    for (var i = 1; i < productsTable.rows.length; i++) {
      var productId = Number(
        productsTable.rows[Number(i)].getElementsByClassName('id')[0].innerHTML
      );
      var numberOfPices = Number(
        productsTable.rows[Number(i)].cells[9].getElementsByTagName('input')[0]
          .value
      );
      // var productPrice =  Number(productsTable.rows[Number(i)].getElementsByClassName("price")[0]) ;
      // this.productInCart.set( productId , numberOfPices );
      productInCart.push(productId);
      total += pp.filter((p) => p.id === productId)[0].price * numberOfPices;
    }
    const fName = (<HTMLInputElement>document.getElementById('fName')).value;
    const lName = (<HTMLInputElement>document.getElementById('lName')).value;
    const phoneNumber = (<HTMLInputElement>document.getElementById('phone'))
      .value;
    // const phone = (<HTMLInputElement>document.getElementById('lName')).value;
    const date = (<HTMLInputElement>document.getElementById('date')).value;
    var customerName = fName + ' ' + lName;
    var products = '';
    var arrOfProducts = [];

    // for (let [key, value] of this.productInCart) {
    // arrOfProducts.push([key , value]) ;
    //   products = products + "ProductId: " +  key + " , NumberOfPices: " +value + " & ";

    //   }
    // this.order.addOrder( products.substr(0 , products.length-2) , phoneNumber , customerName , date ).subscribe() ;
    // this.order.addOrder( arrOfProducts , phoneNumber , customerName , date ).subscribe() ;
    console.log(
      'slknvlsdnvlksnjlksnvbjlk: ',
      total,
      ' : ',
      productInCart,
      ' : '
    );

    this.order
      .addOrder(total, productInCart, fName + ' ' + lName)
      .subscribe((x) => console.log(x));

    // this.productInCart.clear()
    productInCart = [];
  }
}
