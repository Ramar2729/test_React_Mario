import { Grid, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import useStyles from "../../components/CustomAppBar/Styles";
import { connect } from 'react-redux';
import AppStore from "../../redux/store";
import { setDataLoading } from "../../redux/appReducer";
import { loadAllToDo } from "../../services/http";
import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
import RenderLoading from "../../components/CustomAppBar/RenderLoading";

const ToDoPage = (props) => {
  const toDoList = props.toDoList;
  const classes = useStyles();
  const elevation = 7;

//   const loadToDos = async ()=>  {
//     await (loadAllToDo("1"));
//   }

  useEffect(() => {
    console.log("todo", toDoList);
    if (toDoList?.length > 0) AppStore.dispatch(setDataLoading(false));
    else {
        loadAllToDo('1');
    }
  }, []);

  if (props.loading) {
    return <div><RenderLoading/></div>;
  }

  return (
    <div>
      page to Do
      {toDoList.map((toDo) => {
        return (<div className={classes.rootPaper} key={toDo}>
          <Paper
            className={toDo.completed ? classes.disabled : ""}
            elevation={elevation}
          >
            <br />
            <Grid className={classes.PostPaper} container spacing={3}>
              <Grid
                className={classes.PostName}
                item
                xs={8}
                //   onClick={()=>activate(toDo)}
              >
                {toDo.title}
              </Grid>
              <Grid  item xs={4}>
                {toDo.completed? <DoneAllOutlinedIcon className={classes.stateSucces}/> : "en cours..."}
              </Grid>
            </Grid>
          </Paper>
        </div>);
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
    console.log('Check to do list : ', state.toDo.toDoList)
  return {
    loading: state.app.dataLoading,
    toDoList: state.toDo.toDoList,
  };
};

export default connect(mapStateToProps)(ToDoPage);
