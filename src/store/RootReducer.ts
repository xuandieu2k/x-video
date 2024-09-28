import { combineReducers } from 'redux';
import counterReducer from './slices/CounterSlice';

// Kết hợp các reducer
const rootReducer = combineReducers({
  counter: counterReducer,  // Phần state 'counter' được quản lý bởi counterReducer
});

export default rootReducer;