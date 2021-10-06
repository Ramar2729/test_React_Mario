import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './style';



export default function CustomizedInputBase(props) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="ID du Post correspondant"
        value={props.ID_post}
        onChange={(event) => {
                    props.Change(event.target.value)
                }}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton onClick={props.submitID} type="button" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}