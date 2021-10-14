import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolver } from './products/product.resolver';
import { UpdateProductComponent } from './products/update-product/update-product.component';

const routes: Routes = [
    {
        path:"products/updateProduct/:id",
        component:UpdateProductComponent,
        resolve:{
            Product: ProductResolver
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[
      ProductResolver
  ]
})
export class ProductsRoutingModule {

 }
