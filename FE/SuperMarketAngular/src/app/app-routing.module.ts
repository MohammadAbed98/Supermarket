import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const routes: Routes = [
    // {path: 'products' , component:ProductListComponent },
    {path: 'login' , component:LoginComponent },
    // {path: 'products/updateProduct/:id' , component:UpdateProductComponent } ,
    // {path: 'products/addProduct' , component:AddProductComponent } ,
    // {path: 'orders' , component:CreateOrderComponent },
    // {path: 'orders-list' , component:OrdersListComponent },
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    {path: 'products' , loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) }, 
    {path: 'orders' , loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) }, 
    {path: '**' , component:NotFoundPageComponent }, // any path not available 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
