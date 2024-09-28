import { ActionReducerMap } from "@ngrx/store";
import { HomeReducer } from "../../home/home.reducer";
import { ProductSidebarReducer } from "../../product/product-sidebar/product-sidebar.reducer";
import { ProductReducer } from "../../product/product.reducer";
import { CartReducer } from "../../cart/cart.reducer";

export interface State {};

export const reducers: ActionReducerMap <State> = {
    homeReducer:HomeReducer,
    productSidebarReducer:ProductSidebarReducer,
    productReducer:ProductReducer,
    cartReducer:CartReducer
}