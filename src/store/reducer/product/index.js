import {
  ACT_GET_ALL_PRODUCT,
  ACT_GET_TOTAL_PRODUCT,
  ACT_GET_PRODUCT_BY_NAME,
  ACT_GET_CATEGORY_NAME
} from '../../action/product/action.type';

const initialState = {
  productList: [],
  total: 0,
  categories: []
};

export function productReducer(state = initialState, action) {
  switch (action.type) {
    case ACT_GET_ALL_PRODUCT:
      return {
        ...state,
        productList: action.payload
      };
    case ACT_GET_TOTAL_PRODUCT:
      return {
        ...state,
        total: action.payload
      };
    case ACT_GET_PRODUCT_BY_NAME:
      return {
        ...state,
        productList: action.payload
      };

    case ACT_GET_CATEGORY_NAME:
      return {
        ...state,
        categories: action.payload
      };

    default:
      return state;
  }
}
