export const SET_ALBUM_LIST = 'app/album';

export const setAlbumList = (payload) => {
    return {type: SET_ALBUM_LIST, payload}
}

const initialState = {
    albumList: [],
    singleAlbum: null,
}

const albumReducer = (state = initialState, action) => {
    switch (action?.type) {
        case SET_ALBUM_LIST:
            console.log('New list album : ', action.payload)
            return {...state, albumList: action.payload}
        default: return state
    }
}

export default albumReducer;