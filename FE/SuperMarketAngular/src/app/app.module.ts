import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { CreateOrderComponent } from './orders/create-order/create-order.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './orders/order.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects } from './auth/auth.effect';
import { environment } from 'src/environments/environment';
import { LoginReducer } from './store/store';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // LoginComponent,
    UpdateProductComponent,
    AddProductComponent,
    OrdersListComponent,
    CreateOrderComponent,
    ProductListComponent,
    NotFoundPageComponent,
    
    ],
  imports: [
    // RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot(),
    CartModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    StoreModule.forRoot({loggedIn: LoginReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),

  ],
  providers: [CreateOrderComponent , AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
