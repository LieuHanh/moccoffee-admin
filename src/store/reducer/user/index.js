import {
  ACT_GET_ALL_USER,
  ACT_GET_TOTAL_USER,
  ACT_GET_USER_BY_NAME,
  ACT_GET_CATEGORY_NAME,
  ACT_GET_CURRENT_USER,
  ACT_GET_LOGOUT
} from '../../action/user/action.type';

const initialState = {
  userList: [],
  currentUser: JSON.parse(localStorage.getItem('currentUser')),
  roleUser: JSON.parse(localStorage.getItem('currentUser'))
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case ACT_GET_ALL_USER:
      console.log(action.payload);
      return {
        ...state,
        userList: action.payload
      };
    case ACT_GET_TOTAL_USER:
      return {
        ...state,
        total: action.payload
      };
    case ACT_GET_USER_BY_NAME:
      return {
        ...state,
        userList: action.payload
      };

    case ACT_GET_CURRENT_USER:
      console.log('CURRENT USER: ', action.payload);
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return {
        ...state,
        currentUser: action.payload
      };

    case ACT_GET_LOGOUT:
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return {
        ...state,
        currentUser: action.payload
      };

    default:
      return state;
  }
}
