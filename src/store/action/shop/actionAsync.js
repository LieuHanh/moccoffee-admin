import {
  actGetAllShop,
  actGetTotalShop,
  actGetShopByName,
  actGetCategoryName,
  actGetCurrentShop
} from './action';
import userService from '../../../services/shop';

export function actGetAllShopAsync() {
  return async (dispatch) => {
    const result = await userService.getAllShop();
    console.log('DATA: ', result);
    dispatch(actGetAllShop(result));
  };
}

export function actGetTotalShopAsync() {
  return async (dispatch) => {
    const result = await userService.getTotalShop();
    dispatch(actGetTotalShop(result));
  };
}

export function actGetShopByNameAsync(name) {
  return async (dispatch) => {
    let result;
    if (name === '') {
      result = await userService.getAllShop();
      dispatch(actGetAllShop(result));
    } else {
      result = await userService.getShopByName(name);
      dispatch(actGetShopByName(result));
    }
  };
}

export function actGetCategoryNameAsync() {
  return async (dispatch) => {
    const result = await userService.getCategoryNames();
    dispatch(actGetCategoryName(result));
  };
}

export function actAddNewShopAsync(shop) {
  return async () => {
    const result = await userService.addNewShop(shop);
    return result;
  };
}
export function actEditShopAsync(product) {
  return async () => {
    const result = await userService.editShop(product);
    return result;
  };
}

export function actDeleteShopAsync(id) {
  return async () => {
    const result = await userService.deleteShop(id);
    return result;
  };
}

export function actLoginAsync(loginInfo) {
  return async (dispatch) => {
    const result = await userService.login(loginInfo);
    if (result) {
      const user = await userService.getShopByShopName(loginInfo.ShopName);
      console.log('USER: ', user);
      dispatch(actGetCurrentShop(user));
    }
    return result;
  };
}
