import {
  ACT_GET_ALL_ORDER,
  ACT_GET_TOTAL_ORDER,
  ACT_GET_ORDER_BY_NAME,
  ACT_GET_CATEGORY_NAME,
  ACT_GET_CURRENT_ORDER,
  ADD_NEW_ORDER
} from './action.type';

export function actGetAllOrder(shops) {
  return {
    type: ACT_GET_ALL_ORDER,
    payload: shops
  };
}

export function actGetTotalOrder(total) {
  return {
    type: ACT_GET_TOTAL_ORDER,
    payload: total
  };
}

export function actGetOrderByName(shops) {
  return {
    type: ACT_GET_ORDER_BY_NAME,
    payload: shops
  };
}

export function actGetCategoryName(categories) {
  return {
    type: ACT_GET_CATEGORY_NAME,
    payload: categories
  };
}

export function actGetCurrentOrder(user) {
  return {
    type: ACT_GET_CURRENT_ORDER,
    payload: user
  };
}

export function actAddOrder(user) {
  return {
    type: ADD_NEW_ORDER,
    payload: user
  };
}
