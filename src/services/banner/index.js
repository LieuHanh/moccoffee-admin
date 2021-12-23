import API from '..';

const bannerService = {
  getAllBanner: async () => {
    const result = await API.get(`/Banner/list/${0}`);
    console.log('Banner hsnh:', result);
    return result.data;
  },
  getBannerById: async (id) => {
    const result = await API.get(`/Banner/${id}`);
    return result.data;
  },
  addNewBanner: async (newBanner) => {
    console.log('Banner: ', newBanner);
    const formData = new FormData();
    formData.append('bannerId', newBanner.bannerId);
    formData.append('Title', newBanner.Title);
    for (let i = 0; i < newBanner.Image.length; i += 1) {
      formData.append('Image', newBanner.Image[i]);
    }
    try {
      const result = await API.post('/Banner', formData);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  },
  editBanner: async (newBanner) => {
    console.log('Banner: ', newBanner);
    const formData = new FormData();
    formData.append('id', newBanner.id);
    formData.append('bannerId', newBanner.bannerId);
    formData.append('Title', newBanner.Title);
    for (let i = 0; i < newBanner.Image.length; i += 1) {
      formData.append('Image', newBanner.Image[i]);
    }
    try {
      const result = await API.put('/Banner', formData);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  },
  deleteBanner: async (id) => {
    try {
      const result = await API.delete(`/Banner/${id}`);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  }
};

export default bannerService;
