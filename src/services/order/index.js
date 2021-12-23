import API from '..';

const orderService = {
  getAllOrder: async (id) => {
    const result = await API.get(`/Order/${id}`);
    console.log('ORDER ID SS: ', id);
    console.log('ORDER LIST: ', result.data);
    return result.data;
  },
  getOrderByName: async (name) => {
    const result = await API.get(`/Order/${name}`);
    return result.data;
  },
  getCategoryNames: async () => {
    const result = await API.get(`/Employee/categories`);
    return result.data;
  },
  addNewOrder: async (order) => {
    console.log('order: ', order);
    const formData = new FormData();
    formData.append('orderName', order.orderName);
    formData.append('fullName', order.fullName);
    formData.append('email', order.email);
    formData.append('passwordHash', order.passwordHash);
    try {
      const result = await API.post('/Employee', formData);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  },
  editOrder: async (order) => {
    console.log('order: ', order);
    const formData = new FormData();
    formData.append('empId', order.empId);
    formData.append('id', order.id);
    formData.append('orderStatus', order.orderStatus);
    formData.append('paymentStatus', order.paymentStatus);
    formData.append('reasonCancle', order.reasonCancle);
    try {
      const result = await API.put('/Order', formData);
      return result.status;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  },
  deleteOrder: async (id) => {
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
      const result = await API.post(`/Orders/login`, loginInfo);
      return result.data;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  },
  getOrderByOrderName: async (orderName) => {
    try {
      const result = await API.get(`/Employee/orderName/${orderName}`);
      console.log('USERNAME: ', orderName);
      return result.data;
    } catch (err) {
      console.log(err.response.request._response);
    }

    return null;
  }
};

export default orderService;
