import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { StoreSelectedProduct } from '../product.actions';
import { CreateRatingStarsDirective } from '../../shared/directives/create-rating-stars.directive';
import { CommonModule } from '@angular/common';
import { DiscountPricePipe } from '../../shared/pipes/discount-price.pipe';
import { ProductService } from '../product.service';
import { AddItemToCart } from '../../cart/cart.actions';

@Component({
  selector: 'app-selected-product',
  standalone: true,
  imports: [
    CreateRatingStarsDirective,
    DiscountPricePipe,
    CommonModule
  ],
  templateUrl: './selected-product.component.html',
  styleUrl: './selected-product.component.scss'
})
export class SelectedProductComponent {
  public selectedProduct:any;
  public productColor:any;
  public colorImgs = [];
  public currentGalleryImg = '';
  public productSize:any;
  

  constructor(
    private activatedRoute:ActivatedRoute,
    private store:Store<{productReducer:any}>,
    private productService:ProductService,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    const productId = this.activatedRoute.snapshot.paramMap.get('productId')
    console.log('selectedProduct', productId)

     this.store.dispatch(StoreSelectedProduct({ productId }));

    this.subscribeToRedux();
   
  }

  private subscribeToRedux = () => {

    const productReducer$ = this.store.select((state) => {
      return state.productReducer;
    });

    productReducer$.subscribe((productReducer:any) => {
      if(!productReducer.selectedProduct) {
        this.productService.getSelectedProduct(productReducer.selectedProductId)
      }
      this.selectedProduct = productReducer.selectedProduct;
      console.log('selectedProduct', this.selectedProduct)
      this.currentGalleryImg = this.selectedProduct?.images[0]
      this.productColor = this.selectedProduct?.colorFinish?.find(color => color.productId === this.selectedProduct._id).color

      this.colorImgs = this.selectedProduct?.colorFinish?.filter(color => color.img)
      console.log('colorImgs', this.colorImgs)

      this.productSize = this.selectedProduct?.sizes[0];
    });
  }

  public setCurrentGalleryImg = (img) => {
    this.currentGalleryImg = img;
  }

  public getProductByColor = (color) => {
    const productId = color.productId;
    this.store.dispatch(StoreSelectedProduct({ productId }));
  }

  public setProductSize = (size) => {
    this.productSize = size;
  }

  public addItemToCart = () => {
    console.log('SelectedProductComponent.addItemToCart')
    const item = 
    {
      product:this.selectedProduct, 
      quantity: 1, 
      color:this.productColor, 
      size: this.productSize
    }
    
    try {
      this.store.dispatch(AddItemToCart({ item }))
    } catch (e) {
      this.toastr.success('There was a problem adding your item to cart.', '');
      throw e;
    } finally {
      this.toastr.success('Item successfully added to cart.', '');
    }
    
  }
}
