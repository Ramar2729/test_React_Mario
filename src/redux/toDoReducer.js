export const SET_TO_DO_LIST =  'app/toDo';

export const setToDoList = (payload) => {
  return {type: SET_TO_DO_LIST, payload}
}

const initialState = {
  toDoList : [], 
  singleToDo : null,
}

const toDoReducer = (state = initialState, action) => {
  switch (action?.type){
    case SET_TO_DO_LIST:
      console.log('To do list dispatch payload : ', action.payload)
      return { ...state, toDoList: action.payload }
    default: return state;
  }
}

export default toDoReducer;