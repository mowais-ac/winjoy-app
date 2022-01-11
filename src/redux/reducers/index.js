import {combineReducers} from 'redux';
import AppReducer from './AppReducer';
import Bell from './Bell-reducer';

export default combineReducers({
  app: AppReducer,
  Bell,
});
