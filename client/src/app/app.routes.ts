import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { SelectedProductComponent } from './product/selected-product/selected-product.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'product', component: ProductComponent },
    { path: 'cart', component: CartComponent },
    { path: 'selected-product/:productId', component: SelectedProductComponent },
    {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'home'
    },
];
