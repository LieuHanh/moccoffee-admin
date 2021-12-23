import { serialize } from 'object-to-formdata';
import API from '..';

const shopService = {
  getAllShop: async () => {
    const result = await API.get(`/CoffeShops`);
    return result.data;
  },
  getShopByName: async (name) => {
    const result = await API.get(`/CoffeShops/shopList/${name}`);
    return result.data;
  },
  getCategoryNames: async () => {
    const result = await API.get(`/Employee/categories`);
    return result.data;
  },
  addNewShop: async (shop) => {
    console.log('shop: ', shop);
    const formData = new FormData();
    formData.append('shopName', shop.shopName);
    formData.append('description', shop.description);
    formData.append('city', shop.city);
    formData.append('district', shop.district);
    formData.append('ward', shop.ward);
    formData.append('street', shop.street);
    formData.append('lat', shop.lat);
    formData.append('lng', shop.lng);
    for (let i = 0; i < shop.avatarFile.length; i += 1) {
      formData.append('avatarFile', shop.avatarFile[i]);
    }
    try {
      const result = await API.post('/CoffeShops', formData);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  },
  editShop: async (shop) => {
    console.log('SHOP IN SERVICES: ', shop);
    const formData = new FormData();
    formData.append('shopId', shop.shopId);
    formData.append('shopName', shop.shopName);
    formData.append('description', shop.description);
    formData.append('city', shop.city);
    formData.append('district', shop.district);
    formData.append('ward', shop.ward);
    formData.append('street', shop.street);
    formData.append('lat', shop.lat);
    formData.append('lng', shop.lng);
    for (let i = 0; i < shop.avatarFile.length; i += 1) {
      formData.append('avatarFile', shop.avatarFile[i]);
    }
    try {
      const result = await API.put('/CoffeShops', formData);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  },
  deleteShop: async (id) => {
    try {
      const result = await API.delete(`/CoffeShops/${id}`);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  },
  login: async (loginInfo) => {
    try {
      const result = await API.post(`/Shops/login`, loginInfo);
      return result.data;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  },
  getShopByShopName: async (shopName) => {
    try {
      const result = await API.get(`/Employee/shopName/${shopName}`);
      console.log('USERNAME: ', shopName);
      return result.data;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  }
};

export default shopService;
