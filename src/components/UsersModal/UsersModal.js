import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Avatar, Grid, IconButton, Paper } from '@material-ui/core';
import { resetAllData } from '../../services/http';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    flexGrow: 1,
  },
  userPaper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  avatar:{
    cursor:'pointer',
    left:'35%',
  },
}));

const avatarSRC =  'avatar/';

export default function UsersModal({open,handleClose}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render

  const onUserChosed = (user_id) => {
    resetAllData(user_id);
    handleClose(user_id);
    console.log('id_user modal:',user_id);
  }

  const avatarUser = (userId) =>{
    return(
    <IconButton
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      color="inherit"
      onClick={() => {onUserChosed(userId)}}
    >
      <Avatar
        aria-label="recipe" 
        src={avatarSRC+ userId + '.jpg'}/>
    </IconButton>)
  }

  const listingUser = () =>{
    let users = [1,2,3,4,5,6,7,8,9,10];
    return users.map((user)=>{
      return(
        <Grid item xs={6}>
          <Paper className={classes.userPaper}>User {user}
            {avatarUser(user)}
          </Paper>
        </Grid>)
    })
  }

  const body = (
    <div style={{
      width: '50%',
      top: '50%',
      left: '50%',
      position: 'absolute',
      transform: 'translateX(-50%) translateY(-50%)',
      backgroundColor: '#fff',
      padding: '10px'
    }} className={classes.Paper}>
      <div >
      <Grid container spacing={3} >
        {listingUser()}
      </Grid>
    </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}