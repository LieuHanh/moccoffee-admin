import {
  actGetAllUser,
  actGetTotalUser,
  actGetUserByName,
  actGetCategoryName,
  actGetCurrentUser
} from './action';
import userService from '../../../services/user';

export function actGetAllUserAsync() {
  return async (dispatch) => {
    const result = await userService.getAllUser();
    console.log('DATA: ', result);
    dispatch(actGetAllUser(result));
  };
}

export function actGetTotalUserAsync() {
  return async (dispatch) => {
    const result = await userService.getTotalUser();
    dispatch(actGetTotalUser(result));
  };
}

export function actGetUserByNameAsync(name) {
  return async (dispatch) => {
    let result;
    if (name === '') {
      result = await userService.getAllUser(1);
      dispatch(actGetAllUser(result));
    } else {
      result = await userService.getUserByName(name);
      dispatch(actGetUserByName(result));
    }
  };
}

export function actGetCategoryNameAsync() {
  return async (dispatch) => {
    const result = await userService.getCategoryNames();
    dispatch(actGetCategoryName(result));
  };
}

export function actAddNewUserAsync(user) {
  return async () => {
    const result = await userService.addNewUser(user);
    return result;
  };
}
export function actEditUserAsync(product) {
  return async () => {
    const result = await userService.editUser(product);
    return result;
  };
}

export function actDeleteUserAsync(id) {
  return async () => {
    const result = await userService.deleteUser(id);
    return result;
  };
}

export function actLoginAsync(loginInfo) {
  return async (dispatch) => {
    const result = await userService.login(loginInfo);
    if (result) {
      const user = await userService.getUserByUserName(loginInfo.UserName);
      console.log('USER: ', user);
      dispatch(actGetCurrentUser(user));
    }
    return result;
  };
}
