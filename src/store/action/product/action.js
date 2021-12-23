import {
  ACT_GET_ALL_PRODUCT,
  ACT_GET_TOTAL_PRODUCT,
  ACT_GET_PRODUCT_BY_NAME,
  ACT_GET_CATEGORY_NAME
} from './action.type';

export function actGetAllProduct(productPerPage) {
  return {
    type: ACT_GET_ALL_PRODUCT,
    payload: productPerPage
  };
}

export function actGetTotalProduct(total) {
  return {
    type: ACT_GET_TOTAL_PRODUCT,
    payload: total
  };
}

export function actGetProductByName(product) {
  return {
    type: ACT_GET_PRODUCT_BY_NAME,
    payload: product
  };
}

export function actGetCategoryName(categories) {
  return {
    type: ACT_GET_CATEGORY_NAME,
    payload: categories
  };
}
