import { combineReducers } from 'redux';
import albumReducer from './albumReducer';
import appReducer from './appReducer';
import postReducer from './postReducer';
import toDoReducer from './toDoReducer'
const allReducer = combineReducers({
    app: appReducer,
    album: albumReducer,
    post: postReducer,
    toDo: toDoReducer,
});

export default allReducer;
