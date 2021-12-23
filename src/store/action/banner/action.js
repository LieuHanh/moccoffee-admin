import {
  ACT_GET_ALL_BANNER,
  ACT_GET_TOTAL_BANNER,
  ACT_GET_BANNER_BY_NAME,
  ACT_GET_CURRENT_BANNER,
  ADD_NEW_BANNER
} from './action.type';

export function actGetAllBanner(banner) {
  return {
    type: ACT_GET_ALL_BANNER,
    payload: banner
  };
}

export function actGetTotalBanner(total) {
  return {
    type: ACT_GET_TOTAL_BANNER,
    payload: total
  };
}

export function actGetBannerByName(banner) {
  return {
    type: ACT_GET_BANNER_BY_NAME,
    payload: banner
  };
}

export function actGetCurrentBanner(user) {
  return {
    type: ACT_GET_CURRENT_BANNER,
    payload: user
  };
}

export function actAddBanner(user) {
  return {
    type: ADD_NEW_BANNER,
    payload: user
  };
}
