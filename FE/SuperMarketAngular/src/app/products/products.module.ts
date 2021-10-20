import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
// import { ProductsRoutingModule } from '../products-routind.module';



@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    // BrowserModule,
    // AppRoutingModule,
    // HttpClientModule,
    // FormsModule,
  ],
  exports:[  ]
})
export class ProductsModule { }
