import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductResolver } from './product.resolver';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'updateProduct/:id',
    component: UpdateProductComponent,
    resolve:{
      product: ProductResolver
    }
  },
  {
    path: 'addProduct',
    component: AddProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[
    ProductResolver
  ]
})
export class ProductsRoutingModule {}
