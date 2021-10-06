export const SET_DATA_LOADING = 'SET_DATA_LOADING';

export const setDataLoading = (payload) => {
    return {type: SET_DATA_LOADING, payload}
}

const initialSate = {
    dataLoading: true,
}

const appReducer = (state = initialSate, action) => {
    switch (action?.type) {
        case SET_DATA_LOADING:
            return {...state, dataLoading: action.payload}
        default: return state
    }
}

export default appReducer;