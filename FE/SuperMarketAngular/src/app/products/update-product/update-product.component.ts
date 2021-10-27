import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/products';
import { CommonService } from 'src/app/services/Common.Service';
import { updateProduct } from '../productsNgRxTools/products.action';
import { ProductsState } from '../productsNgRxTools/products.reducer';
import { selectedProduct } from '../productsNgRxTools/products.selectors';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  productToBeUpdate!: Product;
  updatedForm!: FormGroup;
  id: number = 0;

  mySelect = '2';
  // selectedValue: boolean = this.productToBeUpdate.active;
  selectedValue: Boolean = false;

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

  @ViewChild('productNameInput', { static: false }) productNameInput:
    | ElementRef
    | undefined; // to pass local refernce to out of compnent
  @ViewChild('productPriceInput', { static: false }) productPriceInput:
    | ElementRef
    | undefined; // to pass local refernce to out of compnent
  @ViewChild('productProductionDateInput', { static: false })
  productProductionDateInput: ElementRef | undefined; // to pass local refernce to out of compnent
  @ViewChild('productExpiryDateInput', { static: false })
  productExpiryDateInput: ElementRef | undefined; // to pass local refernce to out of compnent
  @ViewChild('productNumberOfItemsInput', { static: false })
  productNumberOfItemsInput: ElementRef | undefined; // to pass local refernce to out of compnent
  @ViewChild('productCategoryInput', { static: false }) productCategoryInput:
    | ElementRef
    | undefined; // to pass local refernce to out of compnent
  @ViewChild('productwidthInput', { static: false }) productwidthInput:
    | ElementRef
    | undefined; // to pass local refernce to out of compnent
  @ViewChild('productlengthInput', { static: false }) productlengthInput:
    | ElementRef
    | undefined; // to pass local refernce to out of compnent
  @ViewChild('productHeightInput', { static: false }) productHeightInput:
    | ElementRef
    | undefined; // to pass local refernce to out of compnent
  @ViewChild('productMadeInInput', { static: false }) productMadeInInput:
    | ElementRef
    | undefined; // to pass local refernce to out of compnent
  // @ViewChild('productActiveInput', { static: false }) productActiveInput: ElementRef | undefined; // to pass local refernce to out of compnent
  // constructor(private route: ActivatedRoute,private router: Router,
  //   private productService: ProductService) { }
  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private appStore: Store<ProductsState>
  ) {}

  ngOnInit() {
    // this.product =  this.rout.snapshot.data["product"] ;
    // console.log( ' >> ' +  this.product)

    // this.setLoggedIn(true) ;
    // this.product = new Products();
    // this.id = this.route.snapshot.params['id'];
    this.appStore
      .select(selectedProduct)
      .subscribe((x) => (this.productToBeUpdate = x));
    // this.productService
    //   .getProductById(this.id)
    //   .subscribe((product) => (this.productToBeUpdate = product));
    // this.productService.getProduct(this.id).subscribe(product2 => this.productToBeUpdate = product2) ;
    // this.mySelect = (this.product.active == true)?'1':'2';
    // console.log("::::::::::::::" + this.productToBeUpdate.active  )
    this.updatedForm = this.fb.group({
      name: [''],
      price: [''],
      production_date: [''],
      expiry_date: [''],
      number_of_items: [''],
      category: [''],
      width: [''],
      height: [''],
      length: [''],
      made_in: [''],
      active: [''],
    });
  }
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

  update() {
    // console.log(this.productMadeInInput?.nativeElement.value)
    this.updatedForm.setValue({
      name: this.productNameInput?.nativeElement.value,
      price: parseFloat(this.productPriceInput?.nativeElement.value),
      production_date:
        '' + this.productProductionDateInput?.nativeElement.value,
      expiry_date: '' + this.productExpiryDateInput?.nativeElement.value,
      number_of_items: parseInt(
        this.productNumberOfItemsInput?.nativeElement.value
      ),
      category: parseInt(this.productCategoryInput?.nativeElement.value),
      made_in: this.productMadeInInput?.nativeElement.value,
      width: parseFloat(this.productwidthInput?.nativeElement.value),
      height: parseFloat(this.productHeightInput?.nativeElement.value),
      length: parseFloat(this.productlengthInput?.nativeElement.value),
      active: Boolean(this.selectedValue),
    });

    this.appStore.dispatch(
      updateProduct({ pId: this.id, product: this.updatedForm.value })
    );
  }

  // updateProduct() {
  // this.productService
  //   .updateProduct(this.id, this.updatedForm.value)
  //   .subscribe(
  //     (data) => {
  //       console.log(data);
  //       this.product = new Product();
  //     },
  //     (error) => console.log(error)
  //   );
  // }
}
