import { actGetAllBanner } from './action';
import bannerService from '../../../services/banner';

export function actGetAllBannerAsync() {
  return async (dispatch) => {
    const result = await bannerService.getAllBanner();
    console.log('hhhh988: ', result);
    dispatch(actGetAllBanner(result));
  };
}

export function actAddNewBannerAsync(banner) {
  return async () => {
    const result = await bannerService.addNewBanner(banner);
    return result;
  };
}
export function actEditBannerAsync(banner) {
  return async () => {
    const result = await bannerService.editBanner(banner);
    return result;
  };
}

export function actDeleteBannerAsync(id) {
  return async () => {
    const result = await bannerService.deleteBanner(id);
    return result;
  };
}
