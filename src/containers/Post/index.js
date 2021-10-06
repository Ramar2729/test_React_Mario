import React, { useEffect } from "react";
import ModalForm from "../../components/ModalForm/ModalForm";
import PostCard from "../../components/PostCard/PostCard";
import { fetchPostComments, loadPosts } from "../../services/http";
import { connect } from 'react-redux';
import AppStore from "../../redux/store";
import { setDataLoading } from "../../redux/appReducer";
import RenderLoading from "../../components/CustomAppBar/RenderLoading";

const PostPage = ({
  loading,
  postList,
}) => {

  const [topBtnIsVisible, setTopBtnIsVisible] = React.useState(false);

  useEffect(() => {
    if (postList?.length > 0) {
      AppStore.dispatch(setDataLoading(false));
    } else {
      loadPosts();
    }
    window.addEventListener("scroll", toggleTopBtn);
  }, []);

  const toggleTopBtn = () => {
    if (window.pageYOffset > 200) {
      setTopBtnIsVisible(true);
    } else {
      setTopBtnIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  

  if (loading) return (<div><RenderLoading/></div>);
  return (
    <div>
      <ModalForm
        action="add"
        Post={{ title: "", body: "", userId: "" }}
        expanded={false}
        topBtnIsVisible={topBtnIsVisible}
        handleToTop={scrollToTop}
      />

      {postList.map((item) => {
        return (
          <div>
            <div key={item.model.get_id()}>
              <PostCard
                post={item.model}
                expand_comments={() => {fetchPostComments(item.model)}}
                expanded={item.commentsIsExpanded}
                loadingComments={item.pendingComments}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.app.dataLoading,
    postList: state.post.postList,
  }
}

export default connect(mapStateToProps)(PostPage);
