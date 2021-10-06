import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    position: 'fixed',
    right: '0.3%',
    bottom: '0.5%'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingMenu(props) {
  const classes = useStyles();
  const handleClick=() => {
    console.log(new Date().toISOString());
    console.log(props.currentPost);
    props.setCurrentPost(props.currentPost);
    props.setAction("add");
  };



  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add">
        <AddIcon onClick={handleClick} />
      </Fab>
      {props.topBtnIsVisible && (
        <Fab variant="extended" onClick={props.handleToTop}>
          <NavigationIcon className={classes.extendedIcon} />
        </Fab>
      )}
    </div>
  );
}