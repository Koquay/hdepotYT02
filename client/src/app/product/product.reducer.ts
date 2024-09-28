import { createReducer, on } from "@ngrx/store";
import { StoreProduct, StoreProducts, StoreSelectedProduct } from "./product.actions";

const initialState = {
    topPickProducts: [],
    selectedProduct: {},
    products: [],
    productCount: 0,
    selectedProductId: null
}

export const ProductReducer = createReducer(
    initialState,

    on(StoreProducts, (state, action) => {
        console.log('action.products', action.productData)
      return {
        ...state,
        products: action.productData.products,
        productCount: action.productData.productCount,        
      };
    }),

    on(StoreSelectedProduct, (state, action) => {
      console.log('productReducers.selectedProductId', action.productId)

      state = {
          ...state,    
          selectedProduct: state.products.find(product => product._id === action.productId),   
          selectedProductId: action.productId     
        };

      console.log('productReducer.state', state)

      // saveStateToLocalStorage(state);

      return {
      ...state
      };
  }),

  on(StoreProduct, (state, action) => {
    console.log('productReducers.product', action.product)

    state = {
        ...state,     
        selectedProduct: action.product,
        selectedProductId: action.product._id,             
      };

    console.log('productReducer.state', state)

    // saveStateToLocalStorage(state);

    return {
    ...state
    };
}),
)

