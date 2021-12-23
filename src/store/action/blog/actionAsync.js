import { actGetAllBlog, actGetTotalBlog, actGetBlogByName } from './action';
import blogService from '../../../services/blog';

export function actGetAllBlogAsync() {
  return async (dispatch) => {
    const result = await blogService.getAllBlog();
    console.log('hhhh988: ', result);
    dispatch(actGetAllBlog(result));
  };
}

export function actGetBlogByNameAsync() {
  return async (dispatch) => {
    const result = await blogService.getCategoryNames();
    dispatch(actGetBlogByName(result));
  };
}

export function actGetTotalBlogAsync() {
  return async (dispatch) => {
    const result = await blogService.getTotalOrder();
    dispatch(actGetTotalBlog(result));
  };
}

export function actAddNewBlogAsync(blog) {
  return async () => {
    const result = await blogService.addNewBlog(blog);
    return result;
  };
}
export function actEditBlogAsync(blog) {
  return async () => {
    const result = await blogService.editNew(blog);
    return result;
  };
}

export function actDeleteBlogAsync(id) {
  return async () => {
    const result = await blogService.deleteNew(id);
    return result;
  };
}
