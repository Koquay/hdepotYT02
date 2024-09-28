import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ShortenTextPipe } from '../shared/pipes/shorten-text.pipe';
import { DiscountPricePipe } from '../shared/pipes/discount-price.pipe';
import { OrderSummaryComponent } from "../order/order-summary/order-summary.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    ShortenTextPipe,
    DiscountPricePipe,
    OrderSummaryComponent
],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  public cart;
  public APPLIANCE_DELIVERY = 29.99;

  constructor(
    private store:Store<{cartReducer}>
  ){}

  ngOnInit() {    
    this.subscribeToRedux();
  }

  private subscribeToRedux = () => {
    const cartReducer$ = this.store.select((state) => {
      return state.cartReducer;
    });

    cartReducer$.subscribe((cartReducer:any) => {
      this.cart = cartReducer.cart;
      console.log('CartComponent.cart', this.cart)
    });
  }
}
