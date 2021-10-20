import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { UpdateProductComponent } from './update-product/update-product.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AddProductComponent } from './add-product/add-product.component';
// import { ProductsRoutingModule } from '../products-routind.module';



@NgModule({
  declarations: [ UpdateProductComponent , AddProductComponent ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    
    // HttpClientModule,
    FormsModule,
  ],
  exports:[  ]
})
export class ProductsModule { }
