import {
  ACT_GET_ALL_BLOG,
  ACT_GET_TOTAL_BLOG,
  ACT_GET_BLOG_BY_NAME
} from '../../action/blog/action.type';

const initialState = {
  blogList: [],
  total: 0,
  categories: []
};

export function blogReducer(state = initialState, action) {
  switch (action.type) {
    case ACT_GET_ALL_BLOG:
      return {
        ...state,
        blogList: action.payload
      };
    case ACT_GET_TOTAL_BLOG:
      return {
        ...state,
        total: action.payload
      };
    case ACT_GET_BLOG_BY_NAME:
      return {
        ...state,
        blogList: action.payload
      };
    default:
      return state;
  }
}
