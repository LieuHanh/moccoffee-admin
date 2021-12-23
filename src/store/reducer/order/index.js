import {
  ACT_GET_ALL_ORDER,
  ACT_GET_TOTAL_ORDER,
  ACT_GET_ORDER_BY_NAME
} from '../../action/order/action.type';

const initialState = {
  orderList: []
};

export function orderReducer(state = initialState, action) {
  switch (action.type) {
    case ACT_GET_ALL_ORDER:
      return {
        ...state,
        orderList: action.payload
      };
    case ACT_GET_TOTAL_ORDER:
      return {
        ...state,
        total: action.payload
      };
    case ACT_GET_ORDER_BY_NAME:
      return {
        ...state,
        orderList: action.payload
      };
    default:
      return state;
  }
}
