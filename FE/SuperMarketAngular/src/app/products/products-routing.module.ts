import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductResolver } from './product.resolver';
// import { ProductResolver } from './product.resolver';
import { ProductsResolver } from './productsNgRxTools/products.resolver';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    resolve: { // Befor routin to ProductListComponent => pass input from  ProductsResolver to variable with name ("products") in ProductListComponent
      products: ProductsResolver
    }
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
    ProductsResolver,
    ProductResolver,
  ]
})
export class ProductsRoutingModule {}
