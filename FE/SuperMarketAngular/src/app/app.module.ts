import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { HeaderModule } from './header/header.module';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { CartModule } from './orders/order.module';
import { ProductsModule } from './products/products.module';
import { metaReducers, reducers } from './reducer';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    // HeaderComponent,

    // OrdersListComponent,
    // ProductListComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    // AppRoutingModule,
    HttpClientModule,
    HeaderModule,
    ProductsModule,
    AuthModule.forRoot(),
    StoreModule.forRoot({}),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
        strictActionSerializability: true,
        // strictStateSerializability: true ,
        strictStateImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    CartModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([]),
    // Setting up NgRx Router Store:
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
