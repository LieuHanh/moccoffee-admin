import {
  ACT_GET_ALL_SHOP,
  ACT_GET_TOTAL_SHOP,
  ACT_GET_SHOP_BY_NAME,
  ACT_GET_CURRENT_SHOP,
  ACT_GET_LOGOUT
} from '../../action/shop/action.type';

const initialState = {
  shopList: []
};

export function shopReducer(state = initialState, action) {
  switch (action.type) {
    case ACT_GET_ALL_SHOP:
      return {
        ...state,
        shopList: action.payload
      };
    case ACT_GET_TOTAL_SHOP:
      return {
        ...state,
        total: action.payload
      };
    case ACT_GET_SHOP_BY_NAME:
      return {
        ...state,
        shopList: action.payload
      };
    default:
      return state;
  }
}
