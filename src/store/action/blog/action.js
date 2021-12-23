import {
  ACT_GET_ALL_BLOG,
  ACT_GET_TOTAL_BLOG,
  ACT_GET_BLOG_BY_NAME,
  ACT_GET_CURRENT_BLOG,
  ADD_NEW_BLOG
} from './action.type';

export function actGetAllBlog(blog) {
  return {
    type: ACT_GET_ALL_BLOG,
    payload: blog
  };
}

export function actGetTotalBlog(total) {
  return {
    type: ACT_GET_TOTAL_BLOG,
    payload: total
  };
}

export function actGetBlogByName(shops) {
  return {
    type: ACT_GET_BLOG_BY_NAME,
    payload: shops
  };
}

export function actGetCurrentBlog(user) {
  return {
    type: ACT_GET_CURRENT_BLOG,
    payload: user
  };
}

export function actAddBlog(user) {
  return {
    type: ADD_NEW_BLOG,
    payload: user
  };
}
