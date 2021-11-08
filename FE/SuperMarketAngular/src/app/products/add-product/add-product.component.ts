import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { $ } from 'protractor';
import { Product } from 'src/app/models/products';
import { CommonService } from 'src/app/services/Common.Service';
import { ProductService } from 'src/app/services/product.service';
import { StoreObjects } from 'src/app/services/store.service';
import { addProduct } from '../productsNgRxTools/products.action';
import { ProductsState } from '../productsNgRxTools/products.reducer';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  
  test: string = '';
  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private appStoreProducts: Store<ProductsState>
  ) {}

  addForm!: FormGroup;
  id: number = 0;
  validProductInfo!: boolean;

  mySelect = '2';
  selectedValue: Boolean = false;

  selectChange() {
    if (this.mySelect == '1') {
      this.selectedValue = true;
    } else {
      this.selectedValue = false;
    }
    this.selectedValue = this.commonService.getDropDownText(
      this.mySelect,
      this.data
    )[0].name;
  }
  data = [
    {
      id: 1,
      name: 'true',
    },
    {
      id: 2,
      name: 'false',
    },
  ];

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.addForm = new FormGroup({
      name: new FormControl(null , [Validators.required]),
      price: new FormControl(null , [Validators.required]),
      production_date: new FormControl(null ,[Validators.required]),
      expiry_date: new FormControl(null ,[Validators.required]),
      number_of_items: new FormControl(null ,[Validators.required]),
      category: new FormControl(null ,[Validators.required]),
      width: new FormControl(null ,[Validators.required]),
      height: new FormControl(null ,[Validators.required]),
      length: new FormControl(null ,[Validators.required]),
      made_in: new FormControl(null ,[Validators.required]),
      active: new FormControl(null ,[Validators.required]),
    });

    // if(this.addForm.get("active")?.value == "1"){

    // }
    this.addForm.valueChanges.subscribe((x) => {
      this.validProductInfo = Object.keys(this.addForm.controls).some((key) =>
        ['', null, NaN].includes(this.addForm.value[key])
      );
    });

  }

  ShowErrorMsg(param:any){
    return !this.addForm.get(param)?.valid && (this.addForm.get(param)?.dirty || this.addForm.get(param)?.touched) ;
  }
  // addProduct(){
  //   this.appStoreProducts.dispatch(addProduct(this.addForm.value)) ;
  //   // this.productService.addProduct(this.addForm.value)
  //   // .subscribe(data => {
  //   //   console.log(" >>>>>>>>> ",data);
  //   //   this.product = new Product();
  //   //   this.gotoList();
  //   // }, error => console.log("Error: ",error));
  // }


  addProduct() {

    if(this.addForm.get("active")?.value == "1"){
      this.addForm.patchValue({active:true})
    }else{
      this.addForm.patchValue({active:false})
    }

    if (!this.validProductInfo) {
      this.appStoreProducts.dispatch(addProduct(this.addForm.value ));
    }
  }

  addRow() {
    var arrHead = new Array();
    arrHead = [
      'Product Name',
      'Prica',
      'Production Date',
      'Expiry Date',
      'Number Of Items',
      'Category',
      'Dimensions(L*W*H)',
      'Made In',
      'Active',
    ]; // table headers.

    var empTab = document.getElementById('myTable') as HTMLTableElement;
    // empTab.style.width = "95%"
    var rowCnt = empTab.rows.length; // get the number of rows.
    var tr = empTab.insertRow(rowCnt); // table row.
    tr = empTab.insertRow(rowCnt);

    for (var c = 0; c < arrHead.length; c++) {
      var td = document.createElement('td'); // TABLE DEFINITION.
      td = tr.insertCell(c);

      if (c == 6) {
        // if its the first column of the table.
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
        td.style.borderCollapse = 'separate';
      } else {
        // the 2nd, 3rd and 4th column, will have textbox.
        var ele = document.createElement('input');
        ele.setAttribute('type', 'text');
        ele.setAttribute('value', '');

        td.appendChild(ele);
      }
      empTab.style.borderCollapse = 'separate';
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

// <div [formGroup]="myGroup">
// <input formControlName="firstName">
// <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">
// </div>


