import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import leftSidebarReducer from '../components/LeftSideBar/LeftSidebarReducer';
import customerReducer from './customer/customerReducer';
import terminalReducer from './terminal/terminalReducer';

export default combineReducers({
  routing: routerReducer,
  leftSidebar: leftSidebarReducer,
  customer: customerReducer,
  terminal: terminalReducer
});
