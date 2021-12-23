import { combineReducers } from 'redux';
import { orderReducer } from './order';
import { productReducer } from './product';
import { userReducer } from './user';
import { shopReducer } from './shop';
import { blogReducer } from './blog';
import { categoryReducer } from './category';
import { bannerReducer } from './banner';

const rootReducer = combineReducers({
  orderReducer,
  productReducer,
  userReducer,
  shopReducer,
  blogReducer,
  categoryReducer,
  bannerReducer
});

export default rootReducer;
