export const SET_POST_LIST = "app/posts";
export const SET_POST_COMMENTS = "app/posts/comments";

export const setPostList = (payload) => {
  return { type: SET_POST_LIST, payload };
};

export const setPostComments = (payload) => {
  return { type: SET_POST_COMMENTS, payload };
};

const initialSate = {
  postList: [],
  postComments: [],
};

const postReducer = (state = initialSate, action) => {
  switch (action?.type) {
    case SET_POST_COMMENTS:
      return { ...state, postComments: action.payload };
    case SET_POST_LIST:
      return { ...state, postList: action.payload };
    default:
      return state;
  }
};

export default postReducer;
