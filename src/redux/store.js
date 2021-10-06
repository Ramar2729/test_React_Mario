
import { createStore } from 'redux';
import allReducer from './reducers';

const AppStore = createStore(allReducer);

export default AppStore;