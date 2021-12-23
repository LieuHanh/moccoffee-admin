import { ACT_GET_ALL_BANNER } from '../../action/banner/action.type';

const initialState = {
  bannerList: [],
  total: 0,
  categories: []
};

export function bannerReducer(state = initialState, action) {
  switch (action.type) {
    case ACT_GET_ALL_BANNER:
      return {
        ...state,
        bannerList: action.payload
      };
    default:
      return state;
  }
}
