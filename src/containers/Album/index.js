import { Grid, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import useStyles from "../../components/CustomAppBar/Styles";
import TitlebarImageList from "../../components/TitlebarImageList/TitlebarImageList";
import { loadAlbum } from "../../services/http";
import { connect } from 'react-redux';
import AppStore from "../../redux/store";
import { setDataLoading } from "../../redux/appReducer";
import RenderLoading from "../../components/CustomAppBar/RenderLoading";

const AlbumPage = ({
  loading,
  albumList,
}) => {
    const [id_logged_user, setIdloggedUser] = React.useState("1");
  const classes = useStyles();

  useEffect(() => {
    if (albumList?.length > 0) {
      AppStore.dispatch(setDataLoading(false))
    } else {
      loadAlbum(id_logged_user);
    }
  }, []);

  if (loading) {
    return <div><RenderLoading/></div>;
  }
  console.log('Got list :', albumList?.length)
  return (
    <div>
      Albums et Images
      <div className={classes.rootAlbumContainer}>
        <Grid container spacing={3}>
          {albumList.map((album) => {
            console.log('', album);
            return (<Grid item xs={6} key={Math.random().toString()}>
              <Paper className={classes.albumPaper}>
                <TitlebarImageList albumName={album.title} idAlbum={album.id} title={album.title} imageList={album.imageList} />
              </Paper>
            </Grid>
          )})}
        </Grid>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.app.dataLoading,
    albumList: state.album.albumList,
  }
}

export default connect(mapStateToProps)(AlbumPage);