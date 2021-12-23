import API from '..';

const categoryService = {
  getAllCategory: async (page) => {
    const result = await API.get(`/Category/list`);
    console.log('Category :', result);
    return result.data;
  },
  addNewCategory: async (category) => {
    console.log('Categorynewhanh1: ', category);
    const formData = new FormData();
    formData.append('category_name', category.category_name);
    try {
      const result = await API.post('/Category', formData);
      console.log('Categaddsuccess: ', result.status);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }
    return null;
  },
  editCategory: async (category) => {
    console.log('Category: ', category);
    const formData = new FormData();
    formData.append('category_id', category.category_id);
    formData.append('category_name', category.category_name);
    try {
      const result = await API.put('/Category', formData);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }
    return null;
  },
  deleteCategory: async (id) => {
    try {
      const result = await API.delete(`/Category/${id}`);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  }
};

export default categoryService;
