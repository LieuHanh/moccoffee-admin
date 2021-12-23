import {
  actGetAllProduct,
  actGetTotalProduct,
  actGetProductByName,
  actGetCategoryName
} from './action';
import productService from '../../../services/product';

export function actGetAllProductAsync(page) {
  return async (dispatch) => {
    const result = await productService.getAllProduct(page);
    console.log('DATA: ', result);
    dispatch(actGetAllProduct(result));
  };
}

export function actGetTotalProductAsync() {
  return async (dispatch) => {
    const result = await productService.getTotalProduct();
    dispatch(actGetTotalProduct(result));
  };
}

export function actGetProductByNameAsync(name) {
  return async (dispatch) => {
    let result;
    if (name === '') {
      result = await productService.getAllProduct(1);
      dispatch(actGetAllProduct(result));
    } else {
      result = await productService.getProductByName(name);
      dispatch(actGetProductByName(result));
    }
  };
}

export function actGetCategoryNameAsync() {
  return async (dispatch) => {
    const result = await productService.getCategoryNames();
    dispatch(actGetCategoryName(result));
  };
}

export function actAddNewProductAsync(product) {
  return async () => {
    const result = await productService.addNewProduct(product);
    return result;
  };
}
export function actEditProductAsync(product) {
  return async () => {
    const result = await productService.editProduct(product);
    return result;
  };
}

export function actDeleteProductAsync(id) {
  return async () => {
    const result = await productService.deleteProduct(id);
    return result;
  };
}
