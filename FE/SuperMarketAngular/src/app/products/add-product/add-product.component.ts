import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup , FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/products';
import { CommonService } from 'src/app/services/Common.Service';
import { ProductService } from 'src/app/services/product.service';
import { StoreObjects } from 'src/app/services/store.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  
  @ViewChild('productNameInput', { static: false }) productNameInput: ElementRef | undefined; // to pass local refernce to out of compnent
  @ViewChild('productPriceInput', { static: false }) productPriceInput: ElementRef | undefined; // to pass local refernce to out of compnent
  @ViewChild('productProductionDateInput', { static: false }) productProductionDateInput: ElementRef | undefined; // to pass local refernce to out of compnent
  @ViewChild('productExpiryDateInput', { static: false }) productExpiryDateInput: ElementRef | undefined; // to pass local refernce to out of compnent
  @ViewChild('productNumberOfItemsInput', { static: false }) productNumberOfItemsInput: ElementRef | undefined; // to pass local refernce to out of compnent
  @ViewChild('productCategoryInput', { static: false }) productCategoryInput: ElementRef | undefined; // to pass local refernce to out of compnent
  @ViewChild('productwidthInput', { static: false }) productwidthInput: ElementRef | undefined; // to pass local refernce to out of compnent
  @ViewChild('productlengthInput', { static: false }) productlengthInput: ElementRef | undefined; // to pass local refernce to out of compnent
  @ViewChild('productHeightInput', { static: false }) productHeightInput: ElementRef | undefined; // to pass local refernce to out of compnent
  @ViewChild('productMadeInInput', { static: false }) productMadeInInput: ElementRef | undefined; // to pass local refernce to out of compnent
  // @ViewChild('productActiveInput', { static: false }) productActiveInput: ElementRef | undefined; // to pass local refernce to out of compnent
  
  constructor( private productService: ProductService , private commonService : CommonService ,
     private fb:FormBuilder , private router: Router , private route: ActivatedRoute, private store:StoreObjects ) { }

  productToBeUpdate: Product = new Product;
  addForm!: FormGroup;
  formArr!:FormArray ;
  show: boolean = false ;
  id: number = 0;
  product: Product | undefined ;

  

  mySelect = '2';
  selectedValue: Boolean = false;
  
  selectChange() {
    if(this.mySelect == "1"){
      this.selectedValue = true;
    }else {
      this.selectedValue = false ;
    }
    this.selectedValue = this.commonService.getDropDownText(this.mySelect, this.data)[0].name;
}
  data = [
    {
      id: 1,
      name: 'true'
    },
    {
      id: 2,
      name: 'false'
    } ];

  ngOnInit() {
    this.product = new Product();
    this.id = this.route.snapshot.params['id'];
    // this.productService.getProduct(this.id).subscribe(product => this.productToBeUpdate = product) ;
    this.addForm = this.fb.group({
      name:[''],
      price:[''],
      production_date:[''] ,
      expiry_date:[''] ,
      number_of_items:['']  ,
      category:[''] ,
      width:  [''] ,
      height:[''] ,
      length:[''] ,
      made_in: [''],
      active:[''],

    }) ;

  }
  addProduct(){
    this.productService.addProduct(this.addForm.value)
    .subscribe(data => {
      console.log(" >>>>>>>>> ",data);
      this.product = new Product();
      this.gotoList();
    }, error => console.log("Error: ",error));
  }

add(){
  
  console.log(this.productMadeInInput?.nativeElement.value)
  this.addForm.setValue({
    name: this.productNameInput?.nativeElement.value ,
    price: parseFloat(this.productPriceInput?.nativeElement.value),
    // production_date: "10/6/2021 12:19:25 PM",
    // expiry_date: "10/6/2021 12:19:25 PM" ,
    production_date: "" + this.productProductionDateInput?.nativeElement.value ,
    expiry_date: "" + this.productExpiryDateInput?.nativeElement.value ,
    number_of_items: parseInt(this.productNumberOfItemsInput?.nativeElement.value)  ,
    category: parseInt(this.productCategoryInput?.nativeElement.value) ,
    made_in: this.productMadeInInput?.nativeElement.value ,
    width:  parseInt( this.productwidthInput?.nativeElement.value ),
    height: parseInt(this.productHeightInput?.nativeElement.value ),
    length: parseInt(this.productlengthInput ?.nativeElement.value) ,
    active: Boolean(this.selectedValue)
    // active:true
  }) ;
  this.addProduct(  );    
}
gotoList() {
  this.store.init() ;

  this.router.navigate(['/products']);
}
 
addRow() {
  var arrHead = new Array();
    arrHead = ["Product Name" ,	"Prica" ,	"Production Date" ,	"Expiry Date" ,	"Number Of Items" ,
    	"Category" ,	"Dimensions(L*W*H)" ,	"Made In" ,	"Active"]; // table headers.

  var empTab = document.getElementById('myTable') as HTMLTableElement;
  // empTab.style.width = "95%"  
  var rowCnt = empTab.rows.length;    // get the number of rows.
  var tr = empTab.insertRow(rowCnt); // table row.
  tr = empTab.insertRow(rowCnt);

  for (var c = 0; c < arrHead.length; c++) {
      var td = document.createElement('td');          // TABLE DEFINITION.
      td = tr.insertCell(c);

      if (c == 6) {   // if its the first column of the table.
          // add a Input control.
          var lInput = document.createElement('input');
          var WInput = document.createElement('input');
          var hInput = document.createElement('input');

          // set the attributes.
          // Input.setAttribute('type', 'Input');
          // Input.setAttribute('value', 'Remove');

          // add Input's "onclick" event.
          // Input.setAttribute('onclick', 'removeRow(this)');

          td.appendChild(lInput);
          td.appendChild(WInput);
          td.appendChild(hInput);
          td.style.borderCollapse = "separate"
          
      }
      else {
          // the 2nd, 3rd and 4th column, will have textbox.
          var ele = document.createElement('input');
          ele.setAttribute('type', 'text');
          ele.setAttribute('value', '');

          td.appendChild(ele);
      }
      empTab.style.borderCollapse = "separate";
  
  }


//   var tbodyRef = document.getElementById('myTable')?.getElementsByTagName('tbody')[0];
//   var table = document.getElementById("myTable") as HTMLTableElement;
//   var fRow = table.rows[0] ;
// // Insert a row at the end of table
// var newRow = tbodyRef?.insertRow();

// // Insert a cell at the end of the row
// var newCell = newRow?.insertCell();

// // Append a text node to the cell
// var newText = document.createTextNode('new row');
// newCell?.appendChild(newText);


  // var table = document.getElementById("myTable") as HTMLTableElement;
  // var row = table.insertRow(1);
  // var cell1 = row.insertCell(0);
  // var cell2 = row.insertCell(1);
  // var cell3 = row.insertCell(2);
  // var cell4 = row.insertCell(3);
  // cell1.innerHTML = "NEW CELL1";
  // cell2.innerHTML = "NEW CELL2";
  // cell3.innerHTML = "NEW CELL3";
  // cell4.innerHTML = "NEW CELL3";
}

}


 
 