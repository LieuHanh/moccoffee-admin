import API from '..';

const blogService = {
  getAllBlog: async () => {
    const result = await API.get(`/New/list/${0}`);
    console.log('New :', result);
    return result.data;
  },
  getBlogById: async (id) => {
    const result = await API.get(`/New/${id}`);
    return result.data;
  },
  getCategoryNames: async () => {
    const result = await API.get(`/Employee/categories`);
    return result.data;
  },
  addNewBlog: async (newBlog) => {
    console.log('New: ', newBlog);
    const formData = new FormData();
    formData.append('NewName', newBlog.NewName);
    formData.append('Title', newBlog.Title);
    formData.append('Description', newBlog.Description);
    formData.append('NewStatus', newBlog.NewStatus);
    formData.append('IsHome', newBlog.IsHome);
    for (let i = 0; i < newBlog.Image.length; i += 1) {
      formData.append('Image', newBlog.Image[i]);
    }
    try {
      const result = await API.post('/New', formData);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  },
  editNew: async (newBlog) => {
    console.log('New: ', newBlog);
    const formData = new FormData();
    formData.append('NewId', newBlog.NewId);
    formData.append('NewName', newBlog.NewName);
    formData.append('Title', newBlog.Title);
    formData.append('Description', newBlog.Description);
    formData.append('NewStatus', newBlog.NewStatus);
    formData.append('IsHome', newBlog.IsHome);
    for (let i = 0; i < newBlog.Image.length; i += 1) {
      formData.append('Image', newBlog.Image[i]);
    }
    try {
      const result = await API.put('/New', formData);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  },
  deleteNew: async (id) => {
    try {
      const result = await API.delete(`/New/${id}`);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  }
};

export default blogService;
