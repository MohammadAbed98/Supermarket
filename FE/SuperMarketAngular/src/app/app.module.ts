import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './products/add-product/add-product.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { CreateOrderComponent } from './orders/create-order/create-order.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { StoreModule } from '@ngrx/store';
import { LoginReducer } from './store/store';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    UpdateProductComponent,
    AddProductComponent,
    OrdersListComponent,
    CreateOrderComponent,
    ProductListComponent,
    NotFoundPageComponent,
    
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({loggedIn: LoginReducer}),
    RouterModule.forRoot([
    
    ])
  ],
  providers: [CreateOrderComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
