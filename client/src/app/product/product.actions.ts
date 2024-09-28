import { createAction, props } from "@ngrx/store";

export const StoreProducts = createAction(
    '[Store Products] Store Products',
    props<{ productData }>()
  );

  export const StoreSelectedProduct = createAction(
    '[Store Selected Product] Store Selected Product',
    props<{ productId:any }>()
  );

  export const StoreProduct = createAction(
    '[Store Product] Store Product',
    props<{ product:any }>()
  );
  