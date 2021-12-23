import {
  ACT_GET_ALL_SHOP,
  ACT_GET_TOTAL_SHOP,
  ACT_GET_SHOP_BY_NAME,
  ACT_GET_CATEGORY_NAME,
  ACT_GET_LOGIN,
  ACT_GET_LOGOUT,
  ACT_GET_CURRENT_SHOP,
  ADD_NEW_SHOP
} from './action.type';

export function actGetAllShop(shops) {
  return {
    type: ACT_GET_ALL_SHOP,
    payload: shops
  };
}

export function actGetTotalShop(total) {
  return {
    type: ACT_GET_TOTAL_SHOP,
    payload: total
  };
}

export function actGetShopByName(shops) {
  return {
    type: ACT_GET_SHOP_BY_NAME,
    payload: shops
  };
}

export function actGetCategoryName(categories) {
  return {
    type: ACT_GET_CATEGORY_NAME,
    payload: categories
  };
}

export function actLogin(userLogin) {
  return {
    type: ACT_GET_LOGIN,
    payload: userLogin
  };
}

export function actLogOut() {
  return {
    type: ACT_GET_LOGOUT,
    payload: ''
  };
}

export function actGetCurrentShop(user) {
  return {
    type: ACT_GET_CURRENT_SHOP,
    payload: user
  };
}

export function actAddShop(user) {
  return {
    type: ADD_NEW_SHOP,
    payload: user
  };
}
