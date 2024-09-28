import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CreateRatingStarsDirective } from '../../shared/directives/create-rating-stars.directive';
import { ProcessChange } from './product-sidebar.actions';

@Component({
  selector: 'app-product-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CreateRatingStarsDirective
  ],
  templateUrl: './product-sidebar.component.html',
  styleUrl: './product-sidebar.component.scss'
})
export class ProductSidebarComponent {
  public productSidebar:any;

  constructor(
    private store:Store<{productSidebarReducer:any, productReducer:any}>,
  ){}


  ngOnInit() {
    this.subscribeToRedux();        
  }

  private subscribeToRedux = () => {
    const productSidebarReducer$ = this.store.select((state) => {
      return state.productSidebarReducer;
    });

    productSidebarReducer$.subscribe((productSidebarReducer:any) => {
      this.productSidebar = JSON.parse(JSON.stringify(productSidebarReducer?.productSidebar));
      console.log('productSidebarComponent.productSidebar', this.productSidebar)
    });
  }

  public processChange = () => {
    console.log('productSidebar', this.productSidebar)
    this.store.dispatch(ProcessChange({productSidebar: this.productSidebar}))
  }
}

