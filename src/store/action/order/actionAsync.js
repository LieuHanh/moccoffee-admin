import { actGetAllOrder, actGetTotalOrder, actGetOrderByName, actGetCategoryName } from './action';
import orderService from '../../../services/order';

export function actGetAllOrderAsync(id) {
  return async (dispatch) => {
    const result = await orderService.getAllOrder(id);
    console.log('DATA: ', result);
    dispatch(actGetAllOrder(result));
  };
}

export function actGetTotalOrderAsync() {
  return async (dispatch) => {
    const result = await orderService.getTotalOrder();
    dispatch(actGetTotalOrder(result));
  };
}

export function actGetOrderByNameAsync(name) {
  return async (dispatch) => {
    let result;
    if (name === '') {
      result = await orderService.getAllOrder();
      dispatch(actGetAllOrder(result));
    } else {
      result = await orderService.getOrderByName(name);
      dispatch(actGetOrderByName(result));
    }
  };
}

export function actGetCategoryNameAsync() {
  return async (dispatch) => {
    const result = await orderService.getCategoryNames();
    dispatch(actGetCategoryName(result));
  };
}

export function actAddNewOrderAsync(shop) {
  return async () => {
    const result = await orderService.addNewOrder(shop);
    return result;
  };
}
export function actEditOrderAsync(order) {
  return async () => {
    const result = await orderService.editOrder(order);
    return result;
  };
}

export function actDeleteOrderAsync(id) {
  return async () => {
    const result = await orderService.deleteOrder(id);
    return result;
  };
}
