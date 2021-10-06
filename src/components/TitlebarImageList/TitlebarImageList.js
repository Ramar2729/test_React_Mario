import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ImageList } from '@material-ui/core';
import { ImageListItem } from '@material-ui/core'
import { ImageListItemBar } from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


export default function TitlebarImageList({idAlbum, title, imageList,albumName}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList}>
        <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">{title}</ListSubheader>
        </ImageListItem>
        {imageList.map((item) => (
          <ImageListItem key={item.url}>
            <img src={item.url} alt={item.title} />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>by: {albumName}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}