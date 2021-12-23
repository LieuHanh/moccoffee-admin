import { ACT_GET_ALL_CATEGORY, ACT_GET_CATEGORY_BY_NAME } from '../../action/category/action.type';

const initialState = {
  categoryList: [],
  total: 0
};

export function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case ACT_GET_ALL_CATEGORY:
      return {
        ...state,
        categoryList: action.payload
      };
    case ACT_GET_CATEGORY_BY_NAME:
      return {
        ...state,
        categoryList: action.payload
      };
    default:
      return state;
  }
}
