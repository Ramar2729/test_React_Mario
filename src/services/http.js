import { setAlbumList } from "../redux/albumReducer";
import { setDataLoading } from "../redux/appReducer";
import { setPostList } from "../redux/postReducer";
import { setToDoList } from "../redux/toDoReducer";
import AppStore from "../redux/store";
import Album from "./Album";
import Comment from "./Comment";
import Post from "./Post";
import ServiceConfig from "./ServiceConfig";
import Utils from '../utils/utils';

const BASE_URL_ = ServiceConfig.BASE_URL;

export const loadAlbum = (id_logged_user) => {
  AppStore.dispatch(setDataLoading(true));
  Album.getAlbumsByIdUser(id_logged_user)
    .then((response) => {
      if (response.ok) return fetchingDataResponseOk(response, "Albums");
      else throw new Error("Erreur du serveur");
    })
    .then(async (data) => {
      
      if (data.length > 0) {
        let albumWithImages = []
        data?.map(async (album, index) => {
          const albImgs = await loadImagesByAlbum(album?.id)
          const newAlb = {...album, imageList: albImgs}
          albumWithImages.push(newAlb);
          if (index === data?.length - 1) {
            AppStore.dispatch(setAlbumList(albumWithImages));
          }
          
          return true
        })
        console.log('Album data: ', albumWithImages)
      }
    })
    .catch((error) => {
    })
    .finally(() => {
      AppStore.dispatch(setDataLoading(false));
    });
};

export const loadPosts = () => {
  AppStore.dispatch(setDataLoading(true));
  Post.postsList()
    .then((response) => fetchingDataResponseOk(response, "Publications"))
    .then((data) => {
      let rows = [];
      console.log("Data loaded : ", data);
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          let post = new Post(
            data[i].id,
            data[i].title,
            data[i].body,
            data[i].userId
          );
          let postComponent = {
            model: post,
            commentsIsExpanded: false,
            pendingComments: false,
          };
          rows.push(postComponent);
        }
        AppStore.dispatch(setPostList(Utils.suffle(rows)));
      }
    })
    .catch((error) => {})
    .finally(() => {
      AppStore.dispatch(setDataLoading(false));
    });
};


export const getImagesByIdAlbum = async (idImage) => {
  let url = BASE_URL_ + "albums/" + idImage + "/photos";
  return await fetch(url);
}

export const loadImagesByAlbum = async (idAlbum) => {
  const images = await (await getImagesByIdAlbum(idAlbum)).json();
  if (images?.length > 0) {
    return images
  }
  else {
    return []
  }
}

export const loadAllToDo = async (idUser) =>{
  AppStore.dispatch(setDataLoading(true));
  let url = BASE_URL_ + "users/" + idUser + "/todos";
  const toDos= await (await fetch(url)).json();
  console.log("todo:::::", toDos);
  if (toDos?.length>0){
    AppStore.dispatch(setToDoList(toDos));
    AppStore.dispatch(setDataLoading(false))
  }
  else {AppStore.dispatch(setDataLoading(false));};
}

export const fetchPostComments = (post) => {
  console.log(post.get_comments().length);
  const {postList} = AppStore.getState().post;
  const posts = [...postList];
  const items = posts.slice();
  for (var i in items) {
    if (items[i].model.get_id() === post.get_id()) {
      if (
        post.get_comments().length > 0 &&
        post.get_comments().length !== undefined
      ) {
        items[i].commentsIsExpanded = !items[i].commentsIsExpanded;
        AppStore.dispatch(setPostList(items))
        break;
      } else {
        pendingStatusPostComments(post, true);
        items[i].model
          .fetchComments()
          .then((response) => {
            if (response.ok) return response.json();
            else throw new Error("Erreur du serveur");
          })
          .then((data) => {
            
            // console.log(data);
            let comments = [];
            if (data.length > 0) {
              for (let j = 0; j < data.length; j++) {
                console.log("Comments :", data[j]);
                let comment = new Comment(
                  data[j].id,
                  data[j].name,
                  data[j].email,
                  data[j].body,
                  data[j].postId
                );
                comments.push(comment);
              }
            }
            console.log("Comments posts :", items[i]);
            items[i].model.set_comments(comments);
            items[i].commentsIsExpanded = !items[i].commentsIsExpanded;
            pendingStatusPostComments(post, false);
            AppStore.dispatch(setPostList(items))
          })
          .catch((error) => {
            // TODO
          })
          .finally(() => {});

        break;
      }
    }
  }
};

export const resetAllData = (user_id) => {
  loadAlbum(user_id)
  loadAllToDo(user_id)
}


function pendingStatusPostComments(post, status) {
  console.log("pending post:");
  console.log(post);
  const {postList} = AppStore.getState().post;
  let posts = [...postList]
  const items = posts.slice();
  for (var i in items) {
    if (items[i].model.get_id() === post.get_id()) {
      items[i].pendingComments = status;
      AppStore.dispatch(setPostList(items));
      break;
    }
  }
}

const fetchingDataResponseOk = (response, data) => {
  if (response.ok) {
    // openSnack( data+" reçus avec succès! :) <3","success");
    return response.json();
  } else throw new Error("réponse anormale du serveur!!");
};
