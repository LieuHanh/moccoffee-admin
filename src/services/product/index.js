import API from '..';

const productService = {
  getAllProduct: async (page) => {
    const result = await API.get(`/Product/listProduct/${page}`);
    console.log('Product :', result);
    return result.data;
  },
  getTotalProduct: async () => {
    const result = await API.get(`/Product/listProduct/total`);
    return result.data;
  },
  getProductByName: async (name) => {
    const result = await API.get(`/Product/${name}`);
    return result.data;
  },
  getCategoryNames: async () => {
    const result = await API.get(`/Product/categories`);
    return result.data;
  },
  addNewProduct: async (product) => {
    console.log('Product: ', product);
    const formData = new FormData();
    formData.append('ProductName', product.ProductName);
    formData.append('ProductStatus', product.ProductStatus);
    formData.append('isHot', product.isHot);
    formData.append('Price', product.Price);
    formData.append('Description', product.Description);
    formData.append('CategoryId', product.CategoryId);
    for (let i = 0; i < product.ProductImagesFile.length; i += 1) {
      formData.append('ProductImagesFile', product.ProductImagesFile[i]);
    }
    try {
      const result = await API.post('/Product/createProduct', formData);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  },
  editProduct: async (product) => {
    console.log('Product: ', product);
    const formData = new FormData();
    formData.append('ProductId', product.ProductId);
    formData.append('ProductName', product.ProductName);
    formData.append('Price', product.Price);
    formData.append('Description', product.Description);
    formData.append('CategoryId', product.CategoryId);
    formData.append('ProductStatus', product.ProductStatus);
    formData.append('isHot', product.isHot);
    for (let i = 0; i < product.ProductImagesFile.length; i += 1) {
      formData.append('ProductImagesFile', product.ProductImagesFile[i]);
    }
    try {
      const result = await API.put('/Product/editProduct', formData);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  },
  deleteProduct: async (id) => {
    try {
      const result = await API.delete(`/Product/${id}`);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  }
};

export default productService;
