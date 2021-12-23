import { actGetAllCategory, actGetCategoryByName } from './action';
import catgoryService from '../../../services/category';

export function actGetAllCategoryAsync(page) {
  return async (dispatch) => {
    const result = await catgoryService.getAllCategory();
    console.log('DATA: ', result);
    dispatch(actGetAllCategory(result));
  };
}

export function actgetCategoryByNameAsync(name) {
  return async (dispatch) => {
    let result;
    if (name === '') {
      result = await catgoryService.actGetCategoryByName(1);
      dispatch(actGetCategoryByName(result));
    } else {
      result = await catgoryService.actGetCategoryByName(name);
      dispatch(actGetCategoryByName(result));
    }
  };
}

export function actAddNewCategoryAsync(category) {
  return async () => {
    const result = await catgoryService.addNewCategory(category);
    return result;
  };
}
export function actEditCategoryAsync(category) {
  return async () => {
    const result = await catgoryService.editCategory(category);
    return result;
  };
}

export function actDeleteCategoryAsync(id) {
  return async () => {
    const result = await catgoryService.deleteCategory(id);
    return result;
  };
}
