import { createReducer, on } from "@ngrx/store"
import { AddItemToCart } from "./cart.actions"

const initialState = {
    cart: [],
}

export const CartReducer = createReducer(
    initialState,

    on(AddItemToCart, (state, action) => {
        console.log('CartReducer.product', action.item)
        const existingItem = state.cart?.find(item => item.product._id === action.item.product._id)

        if(existingItem) {
            existingItem.quantity++;
        } else {
            state.cart.push(action.item)
        }
        console.log('CartReducer.state', state)

        // saveStateToLocalStorage(state);

        return {
        ...state,    
        };
    }),

)