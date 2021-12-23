import API from '..';

const userService = {
  getAllUser: async () => {
    const result = await API.get(`/Employee`);
    return result.data;
  },
  getUserByName: async (name) => {
    const result = await API.get(`/Employee/${name}`);
    console.log('USER FROM SERVICE: ', result.data);
    return result.data;
  },
  getCategoryNames: async () => {
    const result = await API.get(`/Employee/categories`);
    return result.data;
  },
  addNewUser: async (user) => {
    console.log('user: ', user);
    const formData = new FormData();
    formData.append('userName', user.userName);
    formData.append('fullName', user.fullName);
    formData.append('email', user.email);
    formData.append('passwordHash', user.passwordHash);
    formData.append('emp_birthday', user.emp_birthday);
    formData.append('emp_gender', user.emp_gender);
    formData.append('coffeeShopId', user.coffeeShopId);
    formData.append('role', user.role);
    try {
      const result = await API.post('/Employee', formData);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  },
  editUser: async (user) => {
    console.log('user: ', user);
    const formData = new FormData();
    formData.append('userId', user.userId);
    formData.append('userName', user.userName);
    formData.append('fullName', user.fullName);
    formData.append('email', user.email);
    formData.append('passwordHash', user.passwordHash);
    formData.append('emp_birthday', user.emp_birthday);
    formData.append('emp_gender', user.emp_gender);
    formData.append('coffeeShopId', user.coffeeShopId);
    formData.append('role', user.role);
    try {
      const result = await API.put('/Employee', formData);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  },
  deleteUser: async (id) => {
    try {
      const result = await API.delete(`/Employee/${id}`);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  },
  login: async (loginInfo) => {
    try {
      const result = await API.post(`/Users/login`, loginInfo);
      return result.data;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  },
  getUserByUserName: async (userName) => {
    try {
      const result = await API.get(`/Employee/userName/${userName}`);
      console.log('USERNAME: ', userName);
      return result.data;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  },

  getRoleUser: async (id) => {
    try {
      const result = await API.get(`/Users/${id}`);
      console.log('ROLE: ', result.data);
      return result.data;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  }
};

export default userService;
