import {
  ACT_GET_ALL_USER,
  ACT_GET_TOTAL_USER,
  ACT_GET_USER_BY_NAME,
  ACT_GET_CATEGORY_NAME,
  ACT_GET_LOGIN,
  ACT_GET_LOGOUT,
  ACT_GET_CURRENT_USER,
  ADD_NEW_USER
} from './action.type';

export function actGetAllUser(users) {
  return {
    type: ACT_GET_ALL_USER,
    payload: users
  };
}

export function actGetTotalUser(total) {
  return {
    type: ACT_GET_TOTAL_USER,
    payload: total
  };
}

export function actGetUserByName(users) {
  return {
    type: ACT_GET_USER_BY_NAME,
    payload: users
  };
}

export function actGetCategoryName(categories) {
  return {
    type: ACT_GET_CATEGORY_NAME,
    payload: categories
  };
}

export function actLogin(userLogin) {
  return {
    type: ACT_GET_LOGIN,
    payload: userLogin
  };
}

export function actLogOut() {
  return {
    type: ACT_GET_LOGOUT,
    payload: ''
  };
}

export function actGetCurrentUser(user) {
  return {
    type: ACT_GET_CURRENT_USER,
    payload: user
  };
}

export function actAddUser(user) {
  return {
    type: ADD_NEW_USER,
    payload: user
  };
}
