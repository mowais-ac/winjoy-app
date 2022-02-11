import {combineReducers} from 'redux';
import AppReducer from './AppReducer';
import EventReducer from './EventReducer';
import Bell from './Bell-reducer';

export default combineReducers({
  app: AppReducer,
  event:EventReducer,
  Bell,
});
