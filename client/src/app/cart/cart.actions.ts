import { createAction, props } from '@ngrx/store';

export const AddItemToCart = createAction(
  '[addItemToCart] addItemToCart',
  props<{ item:any }>()
);
