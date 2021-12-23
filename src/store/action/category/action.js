import { ACT_GET_ALL_CATEGORY, ACT_GET_CATEGORY_BY_NAME, ADD_NEW_CATEGORY } from './action.type';

export function actGetAllCategory(categoryList) {
  return {
    type: ACT_GET_ALL_CATEGORY,
    payload: categoryList
  };
}

export function actGetCategoryByName(category) {
  return {
    type: ACT_GET_CATEGORY_BY_NAME,
    payload: category
  };
}
